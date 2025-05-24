import { createChat } from "@/lib/actions/chat.actions";
import { getUserByClerkID } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ChatType } from "../types";
import { generateRandomID } from "@/lib/utils";

export default async function AppHome() {
  const { userId } = await auth();
  let chat: ChatType;

  if (!userId) {
    const guestUserID = generateRandomID();
    chat = await createChat(guestUserID, true);
  } else {
    const user = await getUserByClerkID(userId);
    chat = await createChat(user._id, false);
  }

  redirect(`/app/${chat._id}`);
}
