"use client";

import { UserType } from "@/app/types";
import Chat from "@/components/Chat";
import { getUserByClerkID } from "@/lib/actions/user.actions";
import { getCookie } from "@/lib/utils";
//import { UserContext } from "@/lib/contexts";
import React, { useContext, useEffect, useState } from "react";

const NewGuestChat = () => {
  //const user = useContext(UserContext);
  //const [user, setUser] = useState<UserType | null>(null);

  return (
    <Chat />
  );
};

export default NewGuestChat;
