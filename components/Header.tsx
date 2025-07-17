"use client";

import SignIn from "@/components/SignIn";
import { ChatsContext } from "@/lib/contexts";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import DeleteDialog from "./dialogs/DeleteDialog";
import PlusIcon from "./icons/PlusIcon";
import OptionsDrawer from "./OptionsDrawer";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import ModelsDrawer from "./ModelsDrawer";
import ModelsDialog from "./dialogs/ModelsDialog";

const Header = () => {
  //State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isModelsDialogOpen, setIsModelsDialogOpen] = useState(false);

  //Context
  const chatsContext = useContext(ChatsContext);

  //Other
  const router = useRouter();
  const pathname = usePathname();
  const windowWidth = useWindowWidth();

  if (!chatsContext) {
    throw new Error("Sidebar must be used within a ChatsContext.Provider");
  }

  const { chats, setChats } = chatsContext;

  const id = pathname.split("/")[2];
  const chatIndex = chats.findIndex((c) => c._id === id);
  const currentChat = chats[chatIndex];
  const areMessagesInChat =
    currentChat && currentChat.messages.length ? true : false;

  const newChat = () => {
    router.push("/app/");
  };

  return (
    <>
      <div className="flex items-start justify-between bg-[var(--color-gemini-card)]">
        <div className="mt-2 ml-14 md:ml-2">
          <button
            className="flex cursor-pointer flex-col gap-1 px-2"
            onClick={() => {
              setIsModelsDialogOpen(true);
            }}
          >
            <span className="text-left text-[20px] leading-7 text-[var(--color-gemini-text)]">
              Gemini
            </span>
            <div className="flex rounded-2xl bg-[var(--color-gemini-background)] pr-1 pl-3 text-[var(--color-gemini-text-secondary)] hover:bg-[var(--color-gemini-card)]">
              <span className="text-[14px] font-medium">2.5 Flash</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 -960 960 960"
                width={24}
                fill="currentColor"
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
            </div>
          </button>
        </div>
        <div className="flex items-center">
          <SignedOut>
            {areMessagesInChat && (
              <button
                onClick={newChat}
                className="mr-2 cursor-pointer rounded-[50%] bg-[var(--color-gemini-background)] p-2 md:hidden"
              >
                <PlusIcon />
              </button>
            )}
            <a
              className="mt-[14px] mr-[22px] text-[14px] leading-5 font-medium text-[var(--color-gemini-text-secondary)] max-md:hidden"
              href="https://gemini.google/about/"
              target="_blank"
            >
              About Gemini
            </a>
          </SignedOut>
          <SignedIn>
            {areMessagesInChat && (
              <div className="mr-3 md:hidden">
                <OptionsDrawer setIsDeleteDialogOpen={setIsDeleteDialogOpen} />
              </div>
            )}
            <Link
              href="https://one.google.com/explore-plan/gemini-advanced"
              className="mt-3 mr-5 hidden h-9 items-center justify-center gap-2 self-start rounded-[8px] bg-[var(--color-gemini-background)] px-6 text-xs font-medium text-[var(--color-gemini-text)] md:flex"
              target="_blank"
            >
              <img
                width={16}
                height={16}
                src="https://www.gstatic.com/lamda/images/gemini_sparkle_red_4ed1cbfcbc6c9e84c31b987da73fc4168aec8445.svg"
              ></img>
              <span>Upgrade</span>
            </Link>
            <div className="my-5 mr-5">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: {
                      width: 32,
                      height: 32,
                    },
                  },
                }}
              />
            </div>
          </SignedIn>
          <SignedOut>
            <div className="my-5 mr-5">
              <SignIn className="inline-block min-w-24 rounded border-1 border-transparent bg-[var(--color-gemini-accent)] py-[9px] text-center text-sm leading-4 font-medium text-white hover:bg-[#1b66c9]" />
            </div>
          </SignedOut>
        </div>
      </div>
      {windowWidth >= 960 ? (
        <ModelsDialog
          isOpen={isModelsDialogOpen}
          setIsOpen={setIsModelsDialogOpen}
        />
      ) : (
        <ModelsDrawer
          isOpen={isModelsDialogOpen}
          setIsOpen={setIsModelsDialogOpen}
        />
      )}

      <DeleteDialog
        currentChat={currentChat}
        chat={currentChat}
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      />
    </>
  );
};

export default Header;
