"use client";

import { ChatInfoContextType, ChatType, UserType } from "@/app/types";
import { createContext } from "react";

const UserContext = createContext<UserType | null>(null);
const ChatContext = createContext<[ChatType] | []>([]);
const ChatInfoContext = createContext<ChatInfoContextType | null>(null);

export { ChatContext, ChatInfoContext, UserContext };
