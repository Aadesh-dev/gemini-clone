"use client";

import { ChatType, UserType } from "@/app/types";
import { createContext } from "react";

const UserContext = createContext<UserType | null>(null);
const ChatContext = createContext<[ChatType] | []>([]);

export {UserContext, ChatContext};