import Chat from "@/components/Chat";
import { loadChat } from "@/tools/chat-store";
import { Message } from '@ai-sdk/react';

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const chat = await loadChat(id);
  const initialMessages = chat.messages;
  return (
    <Chat chatID={id} initialMessages={initialMessages} chat={chat} />
  );
};

export default Page;
