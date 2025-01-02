"use server";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { connectToDatabase } from "../database/mongoose";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import { CreateUserParams } from "@/app/types";

//CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

//READ
export async function getUserByClerkID(clerkID: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkID });

    //if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}
