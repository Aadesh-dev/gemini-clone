"use client";

import {
  ChatInfoContextType,
  ChatsContextType,
  ModelContextType,
  UserContextType,
} from "@/app/types";
import { createContext } from "react";

const UserContext = createContext<UserContextType | null>(null);
const ChatsContext = createContext<ChatsContextType | null>(null);
const ModelContext = createContext<ModelContextType | null>(null);
const ChatInfoContext = createContext<ChatInfoContextType | null>(null);

export { ChatInfoContext, ChatsContext, UserContext, ModelContext };
