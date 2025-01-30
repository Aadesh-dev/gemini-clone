import { Schema } from "mongoose";

// ====== USER ======
declare type CreateUserParams = {
  clerkID: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
};

declare type UserType = {
  _id: Schema.Types.ObjectId;
  clerkID: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
};

// ====== CHAT ======
declare type ChatType = {
  _id: Schema.Types.ObjectId;
  userID: Schema.Types.ObjectId;
  title: string;
  messages: [
    {
      question: string;
      answer: string;
    }
  ];
};

declare type ChatInfo = {
  chatID?: string;
  initialQuestion: string;
};

declare type ChatInfoShared = {
  chatInfo: ChatInfo?;
  setChatInfo: (chatInfo: ChatInfo) => void;
};
