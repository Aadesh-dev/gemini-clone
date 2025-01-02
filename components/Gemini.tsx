"use client";

import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { getChatsByUserID } from "@/lib/actions/chat.actions";
import { generateUserId } from "@/lib/utils";
import { createUser, getUserByClerkID } from "@/lib/actions/user.actions";
import { ChatType, UserType } from "@/app/types";
import { ChatContext, UserContext } from "@/lib/contexts";

const Gemini = () => {
  const [chats, setChats] = useState<[ChatType] | []>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return; // Prevent second execution

    const fetchChatsAndUser = async () => {
      const guestID = localStorage.getItem("guestID");
      if (guestID) {
        const existingUser = await getUserByClerkID(guestID);
        const chats = await getChatsByUserID(existingUser._id);
        setUser(existingUser);
        setChats(chats ? chats : []);
      } else {
        let newGuestClerkID = generateUserId();
        let existingUser = await getUserByClerkID(newGuestClerkID);
        while (existingUser) {
          newGuestClerkID = generateUserId();
          existingUser = await getUserByClerkID(newGuestClerkID);
        }
        const newUser = {
          clerkID: newGuestClerkID,
          email: `guest${newGuestClerkID}@gmail.com`,
          username: `guest${newGuestClerkID}`,
          firstName: "Guest",
          lastName: "Guest",
        };
        const user = await createUser(newUser);
        if (user) {
          setUser(user);
          localStorage.setItem("guestID", newGuestClerkID);
        }
      }
    };

    fetchChatsAndUser();
    effectRan.current = true; // Mark effect as executed
  }, []);

  return (
    <UserContext.Provider value={user}>
      <ChatContext.Provider value={chats}>
        <Sidebar />
        <Chat />
      </ChatContext.Provider>
    </UserContext.Provider>
  );
};

export default Gemini;
