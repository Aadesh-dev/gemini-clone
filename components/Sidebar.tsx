"use client";

import { ChatsContext, UserContext } from "@/lib/contexts";
import { SignedOut } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import DownArrowIcon from "./icons/DownArrowIcon";
import HamburgerIcon from "./icons/HamburgerIcon";
import NewChatIcon from "./icons/NewChatIcon";
import OptionsIcon from "./icons/OptionsIcon";
import SignIn from "./SignIn";
import axios from "axios";
import { handleError } from "@/lib/utils";

const Sidebar = ({ userId }: { userId: string | null }) => {
  //State
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [chatHovered, setChatHovered] = useState(-1);
  const [showMore, setShowMore] = useState(false);

  //Context
  const chatsContext = useContext(ChatsContext);
  const userContext = useContext(UserContext);

  //Other
  const router = useRouter();
  const pathname = usePathname();

  //Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  if (!chatsContext) {
    throw new Error("Sidebar must be used within a ChatsContext.Provider");
  }

  if (!userContext) {
    throw new Error("Sidebar must be used within a UserContext.Provider");
  }

  const { chats } = chatsContext;
  const { user, setUser } = userContext;

  const id = pathname.split("/")[2];
  const chatIndex = chats.findIndex((c) => c._id === id);
  const currentChat = chats[chatIndex];
  const areMessagesInChat =
    currentChat && currentChat.messages.length ? true : false;

  const newChatButtonClass = `rounded-[20px] hover:bg-[rgba(87,91,95,0.08)] flex items-center h-10 transition-all duration-300 ease-in-out overflow-hidden cursor-pointer disabled:pointer-events-none ${
    expanded || hovered
      ? "w-[calc(100%-24px)] mx-3"
      : "w-10 rounded-full mx-4 justify-center px-2"
  }`;

  const newChatTextClass = `my-2 text-[14px] ${
    areMessagesInChat ? "text-[#575b5f]" : "text-[rgba(27,28,29,0.38)]"
  } transition-opacity duration-300 ease-in-out ${
    expanded || hovered ? "opacity-100 block" : "opacity-0 hidden"
  }`;

  const chatContainerClass = `${
    expanded || hovered ? "visible opacity-100" : "invisible opacity-0"
  } ${userId ? "px-3" : "px-4"} pb-2 mt-4 transition-opacity duration-1000 ease-in overflow-y-scroll h-[calc(100vh-140px)]`;

  const newChat = () => {
    router.push("/app/");
  };

  const renderChats = (start: number, end: number) =>
    chats
      .filter((chat) => chat.title !== "New Chat")
      .slice(start, end)
      .map((chat, index) => (
        <div
          key={start + index}
          className="relative text-[14px] text-[#575B5F]"
        >
          <button
            onClick={() => {
              router.push(`/app/${chat._id}`);
            }}
            onMouseEnter={() => {
              setChatHovered(start + index);
            }}
            onMouseLeave={() => {
              setChatHovered(-1);
            }}
            className={
              currentChat && chat._id === currentChat._id
                ? "flex w-full cursor-pointer items-center rounded-[20px] bg-[#d3e3fd] px-3 py-2 text-left font-medium text-[#0842a0]"
                : "flex w-full cursor-pointer items-center rounded-[20px] px-3 py-2 text-left hover:bg-[rgba(87,91,95,.08)]"
            }
          >
            <p className="flex-1 basis-0 overflow-hidden leading-5 overflow-ellipsis whitespace-nowrap">
              {chat.title}
            </p>
            <div className="h-6 w-6"></div>
          </button>
          {chatHovered === start + index && (
            <div
              className="absolute top-[2px] right-0 z-10 flex items-center p-1"
              onMouseEnter={() => {
                setChatHovered(start + index);
              }}
              onMouseLeave={() => {
                setChatHovered(-1);
              }}
            >
              <button
                className={
                  currentChat && chat._id === currentChat._id
                    ? "flex h-7 w-7 items-center justify-center rounded-full px-[6px] py-[1px] hover:bg-white"
                    : "flex h-7 w-7 items-center justify-center rounded-full px-[6px] py-[1px] hover:bg-[#dde3ea]"
                }
              >
                <OptionsIcon />
              </button>
            </div>
          )}
        </div>
      ));

  const handleHamburgerClick = async () => {
    setExpanded(!expanded);
    setHovered(false);
    if (user) {
      setUser({ ...user, sidebarExpanded: !expanded });
    }
    if (userId && user) {
      try {
        await axios.put("/api/user", {
          clerkID: userId,
          user: { ...user, sidebarExpanded: !expanded },
        });
      } catch (error: any) {
        handleError(error);
      }
    }
  };

  useEffect(() => {
    const isExpanded = user && user.sidebarExpanded;
    if (userId && isExpanded !== expanded) {
      setExpanded(user && user.sidebarExpanded ? user.sidebarExpanded : false);
    }
  }, [user]);

  return (
    <div
      className={
        expanded || hovered
          ? "transition-width w-[272px] shrink-0 overflow-hidden bg-[#f0f4f9]"
          : "transition-width w-[72px] shrink-0 overflow-hidden bg-[#f0f4f9]"
      }
      onMouseEnter={() => {
        timerRef.current = setTimeout(() => {
          setHovered(true);
        }, 200);
      }}
      onMouseLeave={() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setHovered(false);
      }}
    >
      <div className="mt-4 ml-4 flex h-12 items-center">
        <button
          onClick={handleHamburgerClick}
          onMouseEnter={() => {
            if (timerRef.current) clearTimeout(timerRef.current);
          }}
          onMouseLeave={() => {
            if (!hovered && !expanded) {
              timerRef.current = setTimeout(() => {
                setHovered(true);
              }, 200);
            }
          }}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-[rgba(87,91,95,0.08)]"
        >
          <HamburgerIcon />
        </button>
      </div>
      <div className="mt-5">
        <button
          onClick={newChat}
          className={newChatButtonClass}
          disabled={!areMessagesInChat}
        >
          <span className={expanded || hovered ? "mr-4 ml-[14px]" : ""}>
            <NewChatIcon
              fill={areMessagesInChat ? "#575B5F" : "rgba(31, 31, 31, 0.38)"}
            />
          </span>
          <span className={newChatTextClass}>New chat</span>
        </button>
        {(expanded || hovered) && (
          <div className={chatContainerClass}>
            <div className={userId ? "py-2 pl-3" : "pt-2 pb-[9px] pl-3"}>
              <h1
                className={
                  userId
                    ? "text-[14px] font-medium text-[#727676]"
                    : "text-[14px] font-medium text-[#1b1c1d]"
                }
              >
                Recent
              </h1>
            </div>
            <SignedOut>
              <div className="flex max-w-sm flex-col rounded-2xl bg-[#dde3ea] px-5 py-4 text-[#1b1c1d]">
                <p className="mb-1 text-sm font-medium">
                  Sign in to start saving your chats
                </p>
                <p className="mb-4 text-sm">
                  The chats that you see here are temporary, and will not be
                  saved unless you sign in.
                </p>
                <SignIn className="ml-[-10px] flex h-10 w-fit items-center rounded-full px-3 text-center text-sm font-medium text-[#0b57d0] hover:bg-[rgba(105,145,214,0.2)]" />
              </div>
            </SignedOut>
            {renderChats(0, 5)}
            {chats.length > 5 && (
              <>
                <div className="text-[14px] text-[#575B5F]">
                  <button
                    onClick={() => {
                      setShowMore(!showMore);
                    }}
                    className="flex w-full cursor-pointer items-center rounded-[20px] px-3 py-2 text-left hover:bg-[rgba(211,227,253,0.5)]"
                  >
                    <p className="leading-5 font-medium">
                      {showMore ? "Show less" : "Show more"}
                    </p>
                    <DownArrowIcon
                      className={showMore ? "rotate-180 transform" : ""}
                    />
                  </button>
                </div>
                {showMore && renderChats(5, chats.length)}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
