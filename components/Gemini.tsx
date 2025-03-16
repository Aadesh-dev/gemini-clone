"use client";

import { ChatInfo } from "@/app/types";
import { ChatInfoContext, UserContext } from "@/lib/contexts";
import React, { useState } from "react";

const Gemini = ({ children }: { children: React.ReactNode }) => {
  //const [user, setUser] = useState<UserType | null>(null);
  const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null);
  // const { userId, isSignedIn } = useAuth();
  // const searchParams = useSearchParams();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isSignedIn) {
  //     if (searchParams.get("guest")) {
  //       const userID = generateRandomID();
  //       setUser({
  //         clerkID: userID,
  //         email: "",
  //         username: "",
  //         firstName: "Guest",
  //         lastName: "Guest",
  //       });
  //       createChat(userID, true).then((chat) => {
  //         router.push(`/app/${chat._id}?guest=true`);
  //       });
  //     } else {
  //       router.push("/");
  //     }
  //   } else {
  //     getUserByClerkID(userId).then((user) => {
  //       createChat(user._id, true).then((chat) => {
  //         router.push(`/app/${chat._id}`);
  //       });
  //     });
  //   }
  // }, []);

  return (
    //<UserContext.Provider value={user}>
    <ChatInfoContext.Provider value={{ chatInfo, setChatInfo }}>
      {children}
    </ChatInfoContext.Provider>
    //</UserContext.Provider>
  );
};

export default Gemini;
