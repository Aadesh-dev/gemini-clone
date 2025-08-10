"use client";

import { ChatType } from "@/app/types";
import { ChatsContext, UserContext } from "@/lib/contexts";
import { handleError } from "@/lib/utils";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import DeleteDialog from "../dialogs/DeleteDialog";
import HamburgerIcon from "../icons/HamburgerIcon";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import { useWindowWidth } from "@/hooks/useWindowWidth";

const SidebarContainer = ({ userId }: { userId: string | null }) => {
  //State
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [chatOptionsOpened, setChatOptionsOpened] = useState<ChatType | null>(
    null,
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  //Context
  const chatsContext = useContext(ChatsContext);
  const userContext = useContext(UserContext);

  //Other
  const pathname = usePathname();

  // Track window width for responsive rendering
  const windowWidth = useWindowWidth();

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
    <>
      <div className="absolute mt-4 ml-3 flex h-12 items-center md:hidden">
        <button
          onClick={handleHamburgerClick}
          className="z-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-[rgba(87,91,95,0.08)]"
        >
          <HamburgerIcon />
        </button>
      </div>
      <DesktopSidebar
        userId={userId}
        expanded={expanded}
        hovered={hovered}
        setHovered={setHovered}
        handleHamburgerClick={handleHamburgerClick}
        setChatOptionsOpened={setChatOptionsOpened}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
      {windowWidth < 960 && (
        <MobileSidebar
          isOpen={expanded}
          onOpenChange={handleHamburgerClick}
          userId={userId}
          expanded={expanded}
          setExpanded={setExpanded}
          hovered={hovered}
          setChatOptionsOpened={setChatOptionsOpened}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        />
      )}
      <DeleteDialog
        currentChat={currentChat}
        chat={chatOptionsOpened}
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      />
      <ToastContainer hideProgressBar />
    </>
  );
};

export default SidebarContainer;
