"use client";

import { UserContext } from "@/lib/contexts";
import React, { useContext } from "react";

const NewChat = () => {
  const user = useContext(UserContext);

  return (
    <div className="grid place-items-center w-full relative top-[66px] h-[calc(100vh-184px)]">
      <p className="text-transparent bg-[length:400%_100%] bg-clip-text [-webkit-text-fill-color:transparent] text-[32px] leading-10 font-medium bg-[linear-gradient(74deg,_#4285f4_0%,_#9b72cb_9%,_#d96570_20%,_#d96570_24%,_#9b72cb_35%,_#4285f4_44%,_#9b72cb_50%,_#d96570_56%,_#ffffff_75%,_#ffffff_100%)]">
        Hello, {user?.firstName}
      </p>
    </div>
  );
};

export default NewChat;
