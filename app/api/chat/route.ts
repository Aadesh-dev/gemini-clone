import { deleteChat, updateChatByID } from "@/lib/actions/chat.actions";
import { google } from "@ai-sdk/google";
import { streamText, appendResponseMessages, smoothStream } from "ai";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  console.log("Received POST request for chat streaming");
  const { messages, id, title, userId, model } = await req.json();
  console.log("Messages:", messages);

  const result = streamText({
    model: google(model),
    system: "You are a helpful assistant.",
    experimental_transform: smoothStream(),
    messages,
    onFinish({ response }) {
      const mergedMessages = appendResponseMessages({
        messages,
        responseMessages: response.messages,
      });
      console.log("Merged messages:", mergedMessages);
      updateChatByID(
        id,
        {
          messages: mergedMessages,
          title,
        },
        userId ? false : true,
      );
    },
  });

  console.log("Streaming result initialized");
  return result.toDataStreamResponse();
}

export async function DELETE(req: Request) {
  try {
    const { chatID } = await req.json();

    const deletedChat = await deleteChat(chatID);

    if (!deletedChat) {
      // This case should ideally be handled by deleteChat throwing an error,
      // but as a fallback, ensure a proper response.
      return NextResponse.json(
        { message: "Chat not found or could not be deleted" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Chat deleted successfully", chat: deletedChat },
      { status: 200 },
    );
  } catch (error: any) {
    if (error.message === "Invalid Chat ID format") {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    if (error.message === "Chat not found") {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
