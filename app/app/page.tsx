import { createChat } from "@/tools/chat-store";
import { redirect } from "next/navigation";

export default async function AppHome() {
  const chatID = await createChat(); // create a new chat
  redirect(`/app/${chatID}`);
}
