import { getUserByClerkID } from "@/lib/actions/user.actions";
import User from "@/lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { clerkID, user } = await req.json();

    await connectToDatabase();

    const existingUser = await getUserByClerkID(clerkID);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { clerkID },
      { ...existingUser, ...user },
      { new: true },
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User update failed" },
        { status: 500 },
      );
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
