import { ChatType } from "@/app/types";
import { ChatsContext } from "@/lib/contexts";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import OptionsDialog from "../dialogs/OptionsDialog";
import SettingsDialog from "../dialogs/SettingsDialog";
import DownArrowIcon from "../icons/DownArrowIcon";
import NewChatIcon from "../icons/NewChatIcon";
import SignIn from "../SignIn";
import SettingsIcon from "../icons/SettingsIcon";

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
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

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

  const newChatButtonClass = `rounded-[20px] hover:bg-[var(--color-chat-hover-background)] flex items-center h-12 md:h-10 transition-width duration-300 ease-in-out overflow-hidden cursor-pointer disabled:pointer-events-none ${
    finalExpanded
      ? "w-[calc(100%-24px)] mx-1 md:mx-3"
      : "w-10 rounded-full mx-4 justify-center px-2"
  }`;

  const newChatTextClass = `my-2 text-[14px] ${
    areMessagesInChat
      ? "text-[var(--color-text-primary)]"
      : "text-[var(--color-new-chat-icon)]"
  } transition-opacity duration-300 ease-in-out ${
    finalExpanded ? "opacity-100 block" : "opacity-0 hidden"
  }`;

  const chatContainerClass = `${
    finalExpanded ? "visible opacity-100" : "invisible opacity-0"
  } ${userId ? "h-[calc(100vh-280px)] md:h-[calc(100vh-232px)]" : "h-[calc(100vh-232px)]"} pb-2 md:mt-4 transition-opacity duration-1000 ease-in overflow-y-auto`;

  const settingsButtonClass = `rounded-[20px] hover:bg-[var(--color-chat-hover-background)] flex items-center h-12 md:h-10 transition-width duration-300 ease-in-out overflow-hidden cursor-pointer disabled:pointer-events-none ${
    finalExpanded
      ? "w-[calc(100%-24px)] mx-1 md:mx-3"
      : "w-10 rounded-full mx-4 justify-center px-2 absolute bottom-7"
  } ${isSettingsDialogOpen ? "bg-[var(--color-selected-chat-background)]" : ""}`;

  const settingsTextClass = `my-2 text-[14px] transition-opacity duration-300 ease-in-out ${
    finalExpanded ? "opacity-100 block" : "opacity-0 hidden"
  } ${isSettingsDialogOpen ? "text-[var(--color-modal-upgrade-button-text)] font-medium" : "text-[var(--color-text-primary)]"}`;

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
          className="relative px-2 text-[14px] text-[var(--color-text-primary)] md:px-3"
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
                ? "flex h-12 w-full cursor-pointer items-center rounded-[30px] bg-[var(--color-selected-chat-background)] px-3 py-2 text-left font-medium text-[var(--color-modal-upgrade-button-text)] md:h-auto"
                : "flex h-12 w-full cursor-pointer items-center rounded-[30px] px-3 py-2 text-left hover:bg-[var(--color-chat-hover-background)] md:h-auto"
            }
          >
            <p className="flex-1 basis-0 overflow-hidden leading-5 overflow-ellipsis whitespace-nowrap">
              {chat.title}
            </p>
            <div className="h-6 w-6"></div>
          </button>
          {chatHovered === start + index && fromDesktop && (
            <div
              className="absolute top-[2px] right-3 z-10 flex items-center p-1"
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
            fill={
              areMessagesInChat
                ? "var(--color-text-primary)"
                : "var(--color-new-chat-icon)"
            }
          />
        </span>
        <span className={newChatTextClass}>New chat</span>
      </button>
      {finalExpanded && (
        <>
          <div className={chatContainerClass}>
            <div
              className={
                userId
                  ? "mx-5 py-1 md:mx-6 md:py-2"
                  : "mx-5 pt-2 pb-[9px] md:mx-7"
              }
            >
              <h1
                className={
                  userId
                    ? "text-[14px] font-medium text-[var(--color-model-selection-title-text)]"
                    : "text-[14px] font-medium text-[var(--color-copy-icon)] md:text-[var(--color-text-tertiary)]"
                }
              >
                Recent
              </h1>
            </div>
            <SignedOut>
              <div className="mx-5 mb-3 flex flex-col rounded-2xl bg-[var(--color-upgrade-button-background)] px-5 py-4 text-[var(--color-copy-icon)] md:mx-4 md:text-[var(--color-text-tertiary)]">
                <p className="mb-1 text-sm font-medium">
                  Sign in to start saving your chats
                </p>
                <p className="mb-4 text-sm">
                  The chats that you see here are temporary, and will not be
                  saved unless you sign in.
                </p>
                <SignIn className="ml-[-10px] flex h-10 w-fit items-center rounded-full px-3 text-center text-sm font-medium text-[var(--color-stop-button)] hover:bg-[var(--color-delete-button-hover-background)]" />
              </div>
              {chats.length <= 1 && !areMessagesInChat && (
                <a
                  className="mt-3 ml-[38px] inline-block text-[14px] leading-5 font-medium text-[var(--color-text-primary)] md:hidden"
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
        </>
      )}
      <button
        className={settingsButtonClass}
        onClick={() => setIsSettingsDialogOpen(true)}
      >
        <span className={finalExpanded ? "mr-4 ml-[14px]" : ""}>
          <SettingsIcon
            fill={
              isSettingsDialogOpen
                ? "var(--color-modal-upgrade-button-text)"
                : "var(--color-text-primary)"
            }
          />
        </span>
        <span className={settingsTextClass}>Settings & help</span>
      </button>
      <SignedIn>
        <div className="mt-[6px] mb-3 pr-[18px] pl-5 md:hidden">
          <Link
            href="https://one.google.com/explore-plan/gemini-advanced"
            className="flex h-9 w-fit items-center justify-center gap-2 rounded-[8px] bg-[var(--color-upgrade-button-background)] px-6 text-xs font-medium text-[var(--color-text-tertiary)]"
            target="_blank"
          >
            <img
              width={16}
              height={16}
              src="https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg"
            ></img>
            <span>Upgrade</span>
          </Link>
        </div>
      </SignedIn>
      <SettingsDialog
        isOpen={isSettingsDialogOpen}
        setIsOpen={setIsSettingsDialogOpen}
      />
    </div>
  );
};

export default SidebarContent;
