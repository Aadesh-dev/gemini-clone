"use client";

import React, { useState } from "react";
//import { generateUserId } from "@/lib/utils";
import { ChatInfo } from "@/app/types";
import { ChatInfoContext } from "@/lib/contexts";

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
