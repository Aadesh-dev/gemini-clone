import { saveChat } from "@/tools/chat-store";
import { google } from "@ai-sdk/google";
import { streamText, appendResponseMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, id, title } = await req.json();

  const result = streamText({
    model: google("gemini-1.5-flash-latest"),
    system: "You are a helpful assistant.",
    messages,
    onFinish({ response }) {
      const mergedMessages = appendResponseMessages({
        messages,
        responseMessages: response.messages,
      });
      saveChat({
        chatID: id,
        messages: appendResponseMessages({
          messages,
          responseMessages: response.messages,
        }),
        title,
      });
    },
  });

  return result.toDataStreamResponse();
}
