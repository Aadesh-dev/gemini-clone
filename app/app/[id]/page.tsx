import Chat from "@/components/Chat";
import { getChatByID } from "@/lib/actions/chat.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { userId } = await auth();
  const { id } = await params;
  const chat = await getChatByID(id, !userId ? true : false);
  if (!chat) {
    redirect("/app");
  }
  const initialMessages = chat.messages;

  return (
    <Chat
      chatID={id}
      userId={userId}
      chat={chat}
      initialMessages={initialMessages}
    />
  );
};

export default Page;
