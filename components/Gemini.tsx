"use client";

import { ChatInfo } from "@/app/types";
import { deleteChatsByUserID } from "@/lib/actions/chat.actions";
import { ChatInfoContext, UserContext } from "@/lib/contexts";
import { useSearchParams } from "next/navigation";
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
  children,
}: {
  children: React.ReactNode;
}) => {
  const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null);

  // useWindowUnloadEffect(() => {
  //   if (userID) {
  //     alert(userID);
  //     deleteChatsByUserID(userID);
  //   }
  // }, true);

  // useEffect(() => {
  //   if (!userID) return;

  //   const handleUnload = () => {
  //     deleteChatsByUserID(userID);
  //   };

  //   // Call on page unload/reload
  //   window.addEventListener("beforeunload", handleUnload);

  //   // Call on component unmount
  //   return () => {
  //     handleUnload();
  //     window.removeEventListener("beforeunload", handleUnload);
  //   }
  // }, [userID]);

  return (
    //<UserContext.Provider value={user}>
    <ChatInfoContext.Provider value={{ chatInfo, setChatInfo }}>
      {children}
    </ChatInfoContext.Provider>
    //</UserContext.Provider>
  );
};

export default Gemini;
