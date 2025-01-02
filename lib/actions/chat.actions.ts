"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { connectToDatabase } from "../database/mongoose";
import Chat from "../database/models/chat.model";
import { handleError } from "../utils";

// READ
export const text = async (prompt: string) => {
  const { text } = await generateText({
    model: google("gemini-1.5-flash-latest"),
    prompt,
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
