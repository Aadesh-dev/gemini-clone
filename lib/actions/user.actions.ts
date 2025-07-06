"use server";

import { UserType } from "@/app/types";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

//CREATE
export async function createUser(user: {
  clerkID: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}): Promise<UserType> {
  let createdUser;
  try {
    await connectToDatabase();
    createdUser = await User.create(user);
    console.log("createdUser: ", createdUser);
  } catch (error) {
    console.error("Error creating user: ", error);
    handleError(error);
  }
  return JSON.parse(JSON.stringify(createdUser));
}

//READ
export async function getUserByClerkID(clerkID: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkID });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(
  clerkID: string,
  user: {
    firstName: string | null;
    lastName: string | null;
    sidebarExpanded?: boolean;
    showIntroMessage?: boolean;
  },
): Promise<UserType> {
  let updatedUser;

  try {
    await connectToDatabase();

    const existingUser = await getUserByClerkID(clerkID);
    updatedUser = await User.findOneAndUpdate(
      { clerkID },
      { ...existingUser, ...user },
    );

    if (!updatedUser) throw new Error("User update failed");
  } catch (error) {
    handleError(error);
  }
  return JSON.parse(JSON.stringify(updatedUser));
}

// DELETE
export async function deleteUser(clerkID: string): Promise<UserType | null> {
  let deletedUser;

  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkID });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    deletedUser = await User.findByIdAndDelete(userToDelete._id);
    //revalidatePath("/");
  } catch (error) {
    handleError(error);
  }
  return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
}
