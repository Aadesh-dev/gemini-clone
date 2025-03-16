import { Message } from "@ai-sdk/react";
import { Schema } from "mongoose";

// ====== USER ======
declare type UserType = {
  _id: string;
  clerkID: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
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
};

declare type ChatInfoContextType = {
  chatInfo: ChatInfo?;
  setChatInfo: (chatInfo: ChatInfo) => void;
};
