"use client";

import { ChatInfo } from "@/app/types";
import { getChatsByClerkID } from "@/lib/actions/chat.actions";
import { ChatInfoContext } from "@/lib/contexts";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Sidebar = () => {
  //State
  const [expanded, setExpanded] = useState(true);
  const [chats, setChats] = useState<ChatInfo[]>([]);

  //Context
  const context = useContext(ChatInfoContext);

  //Other
  const router = useRouter();
  const { userId, isSignedIn } = useAuth();
  const searchParams = useSearchParams();
  const guest = searchParams.get("guest") ? true : false;

  if (!context) {
    throw new Error("Chat must be used within a ChatInfoContext.Provider");
  }

  const { chatInfo } = context;

  const newChatButtonClass = `rounded-[20px] mx-2 px-2 bg-[#dde3ea] hover:bg-[rgba(100,149,237,0.2)] flex items-center font-medium h-10 transition-all duration-300 ease-in-out overflow-hidden cursor-pointer ${
    expanded ? "w-auto" : "w-10 rounded-full"
  }`;

  const newChatTextClass = `ml-4 mr-2 my-2 text-[14px] text-[#444746] transition-opacity duration-300 ease-in-out ${
    expanded ? "opacity-100 block" : "opacity-0 hidden"
  }`;

  const chatContainerClass = `${
    expanded ? "visible opacity-100" : "invisible opacity-0"
  } px-3 pb-2 mt-4 transition-opacity duration-1000 ease-in`;

  const newChat = () => {
    if(guest) {
      router.push("/app?guest=true");
    } else {
      router.push("/app/");
    }
  };

  useEffect(() => {
    if(isSignedIn) {
      getChatsByClerkID(userId).then(chats => {
        setChats(chats);
      });
    }
  }, []);

  useEffect(() => {
    if (chatInfo) {
      setChats((chats) => [chatInfo, ...chats]);
    }
  }, [chatInfo]);

  return (
    <div
      className={
        expanded
          ? "w-[320px] bg-[#f0f4f9] shrink-0 transition-width"
          : "w-[72px] bg-[#f0f4f9] shrink-0 transition-width"
      }
    >
      <div className="h-12 mt-3 ml-4 flex items-center">
        <button
          onClick={() => setExpanded(!expanded)}
          className="h-10 w-10 p-2 rounded-full hover:bg-gray-200 flex justify-center items-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#444746"
          >
            <path d="M144-264v-72h672v72H144Zm0-180v-72h672v72H144Zm0-180v-72h672v72H144Z" />
          </svg>
        </button>
      </div>
      <div className="mt-[44px]">
        <div className="pl-2 pb-4">
          <button onClick={newChat} className={newChatButtonClass}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#444746"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
            <span className={newChatTextClass}>New chat</span>
          </button>
        </div>
        <div className={chatContainerClass}>
          <div className="pl-3 py-2">
            <h1 className="text text-[14px] font-medium">Recent</h1>
          </div>
          {chats.map((chat, index) => (
            <div key={index} className="text-[#575B5F] text-[14px]">
              <div className="relative">
                <button
                  onClick={() => router.push(`/app/${chat._id}`)}
                  className="flex gap-3 items-center pl-[11px] py-[6px] pr[6px] hover:bg-[rgba(87,91,95,.08)] rounded-[20px] w-full text-left cursor-pointer"
                >
                  <div className="flex items-center w-6 h-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 -960 960 960"
                      width="16px"
                      fill="#575B5F"
                    >
                      <path d="M144-264v-72h432v72H144Zm0-180v-72h672v72H144Zm0-180v-72h672v72H144Z" />
                    </svg>
                  </div>
                  <p className="flex-1 basis-0 overflow-hidden overflow-ellipsis whitespace-nowrap leading-5">
                    {chat.title}
                  </p>
                  <div className="w-6 h-6 "></div>
                </button>
                <div className="opacity-0 hover:opacity-100 absolute top-0 right-0 flex items-center  p-1">
                  <button className="flex justify-center items-center rounded-full hover:bg-[rgba(144,158,174,0.3)] w-7 h-7 px-[6px] py-[1px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#1B1C1D"
                    >
                      <path d="M479.79-192Q450-192 429-213.21t-21-51Q408-294 429.21-315t51-21Q510-336 531-314.79t21 51Q552-234 530.79-213t-51 21Zm0-216Q450-408 429-429.21t-21-51Q408-510 429.21-531t51-21Q510-552 531-530.79t21 51Q552-450 530.79-429t-51 21Zm0-216Q450-624 429-645.21t-21-51Q408-726 429.21-747t51-21Q510-768 531-746.79t21 51Q552-666 530.79-645t-51 21Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
