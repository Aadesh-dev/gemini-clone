import { updateChatByID } from "@/lib/actions/chat.actions";
import { google } from "@ai-sdk/google";
import { streamText, appendResponseMessages, smoothStream } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, id, title, userId, model } = await req.json();

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

  return result.toDataStreamResponse();
}
