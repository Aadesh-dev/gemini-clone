import { Message } from "@ai-sdk/react";
import { Schema } from "mongoose";

// ====== USER ======
declare type UserType = {
  _id: string;
  clerkID: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  sidebarExpanded: boolean;
  showIntroMessage: boolean;
};

// ====== CHAT ======
declare type ChatType = {
  _id: string;
  user:
    | {
        _id: string;
        clerkID: string;
        firstName: string;
      }
    | string;
  title: string;
  messages: Message[];
};

declare type ChatInfo = {
  _id: string;
  title: string;
  areMessagesInChat: boolean;
};

declare type ChatInfoContextType = {
  chatInfo: ChatInfo;
  setChatInfo: (chatInfo: ChatInfo) => void;
};

declare type ChatsContextType = {
  chats: ChatType[];
  setChats: (
    chats: ChatType[] | ((prevChats: ChatType[]) => ChatType[]),
  ) => void;
};

declare type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType) => void;
};

declare type ModelContextType = {
  model: string;
  setModel: (model: string) => void;
};
