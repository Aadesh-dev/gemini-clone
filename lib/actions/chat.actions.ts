"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import Chat from "../database/models/chat.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// READ
export const getTextAnswer = async (prompt: string) => {
  const { text } = await generateText({
    model: google("gemini-1.5-flash-latest"),
    prompt,
  });
  return text;
};

export const getChatTitle = async (prompt: string) => {
  const { text } = await generateText({
    model: google("gemini-1.5-flash-latest"),
    prompt: `Generate a title for this prompt: "${prompt}". Just output the title and nothing else. If you have multiple options, select the best one among them and return it.`,
  });
  return text;
};

export async function getChatsByUserID(userID: string) {
  try {
    await connectToDatabase();

    const chats = await Chat.find({ userID });

    //if (!chats) throw new Error("User not found");

    return JSON.parse(JSON.stringify(chats));
  } catch (error) {
    handleError(error);
  }
}
