import Chat from "@/components/Chat";
import { getChatByID } from "@/lib/actions/chat.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { userId } = await auth();
  const { guest } = await searchParams;
  if (!userId && !guest) {
    redirect("/");
  }
  const { id } = await params;
  //const chat = await getChatByID(id);
  const chat = await getChatByID(id, guest ? true : false);
  const initialMessages = chat.messages;
  
  return (
    <Suspense>
      <Chat chatID={id} initialMessages={initialMessages} chat={chat} />
    </Suspense>
  );
};

export default Page;
