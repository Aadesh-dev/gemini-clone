"use server";

import { ChatType } from "@/app/types";
import { google } from "@ai-sdk/google";
import { generateId, generateText, Message } from "ai";
import { readFile, writeFile } from "fs/promises";
import Chat from "../database/models/chat.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

const populateUser = (query: any) =>
  query.populate({
    path: "user",
    model: User,
    select: "_id clerkID firstName",
  });

//CREATE
export const createChat = async (
  userID: string,
  guest: boolean
): Promise<ChatType> => {
  const newChat = {
    title: "New Chat",
    user: userID,
    messages: [],
  };
  let createdChat;
  try {
    await connectToDatabase();

    let user;

    if (!guest) {
      user = await User.findById(userID);
      if (!user) {
        throw new Error("User not found");
      }
      newChat.user = user._id;
    }

    createdChat = await Chat.create(newChat);
    //revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
  return JSON.parse(JSON.stringify(createdChat));
};

// READ
export const getTextAnswer = async (prompt: string) => {
  const { text } = await generateText({
    model: google("gemini-2.0-flash"),
    prompt,
  });

  return text;
};

export const getChatTitle = async (prompt: string) => {
  const { text } = await generateText({
    model: google("gemini-2.0-flash"),
    prompt: `Generate a title for this prompt: "${prompt}". Just output the title and nothing else. If you have multiple options, select the best one among them and return it.`,
  });

  return text;
};

export const getChatByID = async (
  chatID: string,
  guest: boolean
): Promise<ChatType> => {
  let chat;

  try {
    await connectToDatabase();

    if (guest) {
      chat = await Chat.findById(chatID);
    } else {
      chat = await populateUser(Chat.findById(chatID));
    }

    if (!chat) throw new Error("Chat not found");
  } catch (error) {
    handleError(error);
  }
  return JSON.parse(JSON.stringify(chat));
};

export async function getChatsByClerkID(userID: string): Promise<ChatType[]> {
  let chats = [];

  try {
    await connectToDatabase();

    chats = await Chat.find({ "user.clerkID": userID });
  } catch (error) {
    handleError(error);
  }
  return JSON.parse(JSON.stringify(chats));
}

//UPDATE
export const updateChatByID = async ({
  chatID,
  messages,
  title,
  guest,
}: {
  chatID: string;
  messages: Message[];
  title: string;
  guest: boolean;
}): Promise<ChatType> => {
  let updatedChat;

  try {
    await connectToDatabase();

    const chat = await getChatByID(chatID, guest);
    chat.messages = messages;
    chat.title = title;

    updatedChat = await Chat.findByIdAndUpdate(chatID, chat);
    //revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
  return JSON.parse(JSON.stringify(updatedChat));
};

// DELETE
export async function deleteChatsByUserID(userID: string) {
  try {
    await connectToDatabase();

    await Chat.deleteMany({ user: userID });
  } catch (error) {
    handleError(error);
  }
}
