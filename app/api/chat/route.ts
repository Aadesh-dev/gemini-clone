import { updateChatByID } from "@/lib/actions/chat.actions";
import { google } from "@ai-sdk/google";
import { streamText, appendResponseMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, id, title, userId } = await req.json();

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: "You are a helpful assistant.",
    messages,
    onFinish({ response }) {
      const mergedMessages = appendResponseMessages({
        messages,
        responseMessages: response.messages,
      });
      updateChatByID({
        chatID: id,
        messages: mergedMessages,
        title,
        guest: userId ? false : true,
      });
    },
  });

  return result.toDataStreamResponse();
}
