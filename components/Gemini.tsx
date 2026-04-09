"use client";

import { ChatType, UserType } from "@/app/types";
import { ChatsContext, ModelContext, UserContext } from "@/lib/contexts";
import React, { useEffect, useRef, useState } from "react";

const useWindowUnloadEffect = (handler: () => void, callOnCleanup: boolean) => {
  const cb = useRef(() => {});

  cb.current = handler;

  useEffect(() => {
    const handler = () => cb.current();

    window.addEventListener("beforeunload", handler);

    return () => {
      if (callOnCleanup) handler();

      window.removeEventListener("beforeunload", handler);
    };
  }, [callOnCleanup]);
};

const Gemini = ({
  currentUser,
  children,
}: {
  currentUser: UserType | null;
  children: React.ReactNode;
}) => {
  const [chats, setChats] = useState<ChatType[] | []>([]);
  const [user, setUser] = useState<UserType | null>(currentUser);
  const [model, setModel] = useState<string>("gemini-2.5-flash");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ChatsContext.Provider value={{ chats, setChats }}>
        <ModelContext.Provider value={{ model, setModel }}>
          {children}
        </ModelContext.Provider>
      </ChatsContext.Provider>
    </UserContext.Provider>
  );
};

export default Gemini;
