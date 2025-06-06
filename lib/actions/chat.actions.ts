"use server";

import { ChatType } from "@/app/types";
import { google } from "@ai-sdk/google";
import { generateText, Message } from "ai";
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
  guest: boolean,
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
    model: google("gemini-2.5-flash-preview-05-20"),
    prompt,
  });

  return text;
};

export const getChatTitle = async (prompt: string, model: string) => {
  const { text } = await generateText({
    model: google(model),
    prompt: `Generate a title for this prompt: "${prompt}". Just output the title and nothing else. If you have multiple options, select the best one among them and return it.`,
  });

  return text;
};

export const getChatByID = async (
  chatID: string,
  guest: boolean,
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
export const updateChatByID = async (
  chatID: string,
  chat: {
    messages: Message[];
    title: string;
  },
  guest: boolean,
): Promise<ChatType> => {
  let updatedChat;

  try {
    await connectToDatabase();

    const existingChat = await getChatByID(chatID, guest);

    updatedChat = await Chat.findByIdAndUpdate(chatID, {
      ...existingChat,
      ...chat,
    });
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
