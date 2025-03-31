import { createChat } from "@/lib/actions/chat.actions";
import { getUserByClerkID } from "@/lib/actions/user.actions";
import { generateRandomID } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AppHome({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { userId } = await auth();
  const { guest, userID } = await searchParams;

  if (!userId) {
    if (guest) {
      const chat = await createChat(
        typeof userID === "string" ? userID : "",
        true
      );
      redirect(`/app/${chat._id}?guest=true`);
    } else {
      redirect("/");
    }
  } else {
    const user = await getUserByClerkID(userId);
    const chat = await createChat(user._id, false);
    redirect(`/app/${chat._id}`);
  }
}
