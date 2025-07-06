import React, { useContext, useState } from "react";
import NewChatIcon from "../icons/NewChatIcon";
import { usePathname, useRouter } from "next/navigation";
import { ChatsContext } from "@/lib/contexts";
import { ChatType } from "@/app/types";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import DownArrowIcon from "../icons/DownArrowIcon";
import SignIn from "../SignIn";
import OptionsDialog from "../OptionsDialog";
import Link from "next/link";

const SidebarContent = ({
  userId,
  expanded,
  setExpanded,
  hovered,
  setChatOptionsOpened,
  setIsDeleteDialogOpen,
  fromDesktop,
}: {
  userId: string | null;
  expanded: boolean;
  setExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  hovered: boolean;
  setChatOptionsOpened: React.Dispatch<React.SetStateAction<ChatType | null>>;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fromDesktop?: boolean;
}) => {
  //State
  const [chatHovered, setChatHovered] = useState(-1);
  const [showMore, setShowMore] = useState(false);

  //Context
  const chatsContext = useContext(ChatsContext);

  //Other
  const pathname = usePathname();
  const router = useRouter();

  if (!chatsContext) {
    throw new Error("Sidebar must be used within a ChatsContext.Provider");
  }

  const { chats, setChats } = chatsContext;

  const id = pathname.split("/")[2];
  const chatIndex = chats.findIndex((c) => c._id === id);
  const currentChat = chats[chatIndex];
  const areMessagesInChat =
    currentChat && currentChat.messages.length ? true : false;
  const finalExpanded = fromDesktop ? expanded || hovered : expanded;

  const newChatButtonClass = `rounded-[20px] hover:bg-[rgba(87,91,95,0.08)] flex items-center h-12 md:h-10 transition-all duration-300 ease-in-out overflow-hidden cursor-pointer disabled:pointer-events-none ${
    finalExpanded
      ? "w-[calc(100%-24px)] mx-1 md:mx-3"
      : "w-10 rounded-full mx-4 justify-center px-2"
  }`;

  const newChatTextClass = `my-2 text-[14px] ${
    areMessagesInChat ? "text-[#575b5f]" : "text-[rgba(27,28,29,0.38)]"
  } transition-opacity duration-300 ease-in-out ${
    finalExpanded ? "opacity-100 block" : "opacity-0 hidden"
  }`;

  const chatContainerClass = `${
    finalExpanded ? "visible opacity-100" : "invisible opacity-0"
  } ${userId ? "px-2 md:px-3 h-[calc(100vh-188px)] md:h-[calc(100vh-140px)]" : "px-5 md:px-4 h-[calc(100vh-140px)]"} pb-2 md:mt-4 transition-opacity duration-1000 ease-in overflow-y-scroll`;

  const newChat = () => {
    router.push("/app/");
    if (!fromDesktop && setExpanded) setExpanded(false);
  };

  const renderChats = (start: number, end: number) =>
    chats
      .filter((chat) => chat.title !== "New Chat")
      .slice(start, end)
      .map((chat, index) => (
        <div
          key={start + index}
          id={chat._id}
          className="relative text-[14px] text-[#575B5F]"
        >
          <button
            onClick={() => {
              router.push(`/app/${chat._id}`);
              if (!fromDesktop && setExpanded) setExpanded(false);
            }}
            onMouseEnter={() => {
              setChatHovered(start + index);
            }}
            onMouseLeave={() => {
              setChatHovered(-1);
            }}
            className={
              currentChat && chat._id === currentChat._id
                ? "flex h-12 w-full cursor-pointer items-center rounded-[30px] bg-[#d3e3fd] px-3 py-2 text-left font-medium text-[#0842a0] md:h-auto"
                : "flex h-12 w-full cursor-pointer items-center rounded-[30px] px-3 py-2 text-left hover:bg-[rgba(87,91,95,.08)] md:h-auto"
            }
          >
            <p className="flex-1 basis-0 overflow-hidden leading-5 overflow-ellipsis whitespace-nowrap">
              {chat.title}
            </p>
            <div className="h-6 w-6"></div>
          </button>
          {chatHovered === start + index && fromDesktop && (
            <div
              className="absolute top-[2px] right-0 z-10 flex items-center p-1"
              onMouseEnter={() => {
                setChatHovered(start + index);
              }}
              onMouseLeave={() => {
                setChatHovered(-1);
              }}
            >
              <OptionsDialog
                currentChat={currentChat}
                chat={chat}
                setChatOptionsOpened={setChatOptionsOpened}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
              />
            </div>
          )}
        </div>
      ));

  return (
    <div className="mt-19 md:mt-5">
      <button
        onClick={newChat}
        className={newChatButtonClass}
        disabled={!areMessagesInChat}
      >
        <span className={finalExpanded ? "mr-4 ml-[14px]" : ""}>
          <NewChatIcon
            fill={areMessagesInChat ? "#575B5F" : "rgba(31, 31, 31, 0.38)"}
          />
        </span>
        <span className={newChatTextClass}>New chat</span>
      </button>
      {finalExpanded && (
        <>
          <div className={chatContainerClass}>
            <div
              className={userId ? "py-1 pl-3 md:py-2" : "pt-2 pb-[9px] md:pl-3"}
            >
              {chats.filter((chat) => chat.title !== "New Chat").length ? (
                <h1
                  className={
                    userId
                      ? "text-[14px] font-medium text-[#727676]"
                      : "text-[14px] font-medium text-[#444746] md:text-[#1b1c1d]"
                  }
                >
                  Recent
                </h1>
              ) : (
                <></>
              )}
            </div>
            <SignedOut>
              <div className="mb-3 flex flex-col rounded-2xl bg-[#dde3ea] px-5 py-4 text-[#444746] md:max-w-sm md:text-[#1b1c1d]">
                <p className="mb-1 text-sm font-medium">
                  Sign in to start saving your chats
                </p>
                <p className="mb-4 text-sm">
                  The chats that you see here are temporary, and will not be
                  saved unless you sign in.
                </p>
                <SignIn className="ml-[-10px] flex h-10 w-fit items-center rounded-full px-3 text-center text-sm font-medium text-[#0b57d0] hover:bg-[rgba(105,145,214,0.2)]" />
              </div>
              {!areMessagesInChat && (
                <a
                  className="mt-3 ml-[18px] inline-block text-[14px] leading-5 font-medium text-[#575b5f] md:hidden"
                  href="https://gemini.google/about/"
                  target="_blank"
                >
                  About Gemini
                </a>
              )}
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
          <SignedIn>
            <div className="mb-3 pr-3 pl-[10px] md:hidden">
              <Link
                href="https://one.google.com/explore-plan/gemini-advanced"
                className="flex h-9 w-fit items-center justify-center gap-2 rounded-[8px] bg-[#dde3ea] px-6 text-xs font-medium text-[#1b1c1d]"
                target="_blank"
              >
                <img
                  width={16}
                  height={16}
                  src="https://www.gstatic.com/lamda/images/gemini_sparkle_red_4ed1cbfcbc6c9e84c31b987da73fc4168aec8445.svg"
                ></img>
                <span>Upgrade</span>
              </Link>
            </div>
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default SidebarContent;
