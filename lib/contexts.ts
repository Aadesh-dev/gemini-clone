"use client";

import { ChatInfoShared, ChatType, UserType } from "@/app/types";
import { createContext } from "react";

const UserContext = createContext<UserType | null>(null);
const ChatContext = createContext<[ChatType] | []>([]);
const ChatInfoContext = createContext<ChatInfoShared | null>(null);

export { ChatContext, ChatInfoContext, UserContext };
