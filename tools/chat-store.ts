import { ChatType } from "@/app/types";
import { generateId, Message } from "ai";
import { existsSync, mkdirSync } from "fs";
import { writeFile, readFile } from "fs/promises";
import path from "path";

//Create
export const createChat = async (): Promise<string> => {
  const chatID = generateId(); // generate a unique chat ID
  const newChat: ChatType = {
    chatID,
    userID: null,
    title: "",
    messages: [],
  };
  const content = JSON.stringify(newChat, null, 2);
  await writeFile(getChatFile(chatID), content); // create an empty chat file
  return chatID;
};

// export const createChat = (chatID: string) => {
//   const newChat: ChatType = {
//     chatID,
//     userID: null,
//     title: "",
//     messages: [],
//   };
//   localStorage.setItem(chatID, JSON.stringify(newChat));
// };

//Read
export const loadChat = async (chatID: string): Promise<ChatType> => {
  const chatFile = await readFile(getChatFile(chatID), "utf8");
  return JSON.parse(chatFile) as ChatType;
};

function getChatFile(chatID: string): string {
  const chatDir = path.join(process.cwd(), ".chats");
  if (!existsSync(chatDir)) mkdirSync(chatDir, { recursive: true });
  return path.join(chatDir, `${chatID}.json`);
}

// export const loadChat = async (chatID: string): Promise<ChatType> => {
//   const existingChat = localStorage.getItem(chatID);
//   const existingChatObj = JSON.parse(existingChat ?? "{}");
//   return existingChatObj;
// };

//Update
export const saveChat = async ({
  chatID,
  messages,
  title,
}: {
  chatID: string;
  messages: Message[];
  title: string;
}): Promise<void> => {
  const existingChat = await loadChat(chatID); 
  existingChat.messages = messages;
  existingChat.title = title;
  const content = JSON.stringify(existingChat, null, 2);
  await writeFile(getChatFile(chatID), content);
};

// export const saveChat = async ({
//   chatID,
//   messages,
//   title,
// }: {
//   chatID: string;
//   messages: Message[];
//   title: string;
// }) => {
//   const existingChat = await loadChat(chatID);
//   existingChat.messages = messages;
//   existingChat.title = title;
//   localStorage.setItem(chatID, JSON.stringify(existingChat, null, 2));
// };
