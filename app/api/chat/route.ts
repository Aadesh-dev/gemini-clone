import { deleteChat, updateChatByID } from "@/lib/actions/chat.actions";
import { google } from "@ai-sdk/google";
import { streamText, appendResponseMessages, smoothStream } from "ai";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, id, title, userId, model } = await req.json();
  //console.log("Messages:", messages);

  const result = streamText({
    model: google(model),
    system: "You are a helpful assistant.",
    experimental_transform: smoothStream(),
    messages,
    onFinish: async ({ response }) => {
      const mergedMessages = appendResponseMessages({
        messages,
        responseMessages: response.messages,
      });
      //console.log("Merged messages:", mergedMessages);
      await updateChatByID(
        id,
        {
          messages: mergedMessages,
          title,
        },
        userId ? false : true,
      );
    },
  });

  return result.toDataStreamResponse();
}
