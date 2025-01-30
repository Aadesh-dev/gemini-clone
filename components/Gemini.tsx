"use client";

import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { getChatsByUserID } from "@/lib/actions/chat.actions";
import { generateUserId } from "@/lib/utils";
import { createUser, getUserByClerkID } from "@/lib/actions/user.actions";
import { ChatInfo, ChatInfoShared, ChatType, UserType } from "@/app/types";
import { ChatContext, ChatInfoContext, UserContext } from "@/lib/contexts";

const Gemini = ({children}: {children: React.ReactNode}) => {
  //const [chats, setChats] = useState<[ChatType] | []>([]);
  //const [user, setUser] = useState<UserType | null>(null);
  const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null);

  return (
    //<UserContext.Provider value={user}>
    <ChatInfoContext.Provider value={{ chatInfo, setChatInfo }}>
      {children}
    </ChatInfoContext.Provider>
    //</UserContext.Provider>
  );
};

export default Gemini;
