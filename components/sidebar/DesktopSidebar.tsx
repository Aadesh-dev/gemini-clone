import React, { useRef } from "react";
import HamburgerIcon from "../icons/HamburgerIcon";
import SidebarContent from "./SidebarContent";
import { ChatType } from "@/app/types";

const DesktopSidebar = ({
  userId,
  expanded,
  hovered,
  setHovered,
  handleHamburgerClick,
  setChatOptionsOpened,
  setIsDeleteDialogOpen,
}: {
  userId: string | null;
  expanded: boolean;
  hovered: boolean;
  setHovered: React.Dispatch<React.SetStateAction<boolean>>;
  handleHamburgerClick: () => void;
  setChatOptionsOpened: React.Dispatch<React.SetStateAction<ChatType | null>>;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  //Refs
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <div
      className={
        expanded || hovered
          ? "transition-width hidden w-[272px] shrink-0 overflow-hidden bg-[#f0f4f9] md:block"
          : "transition-width hidden w-[72px] shrink-0 overflow-hidden bg-[#f0f4f9] md:block"
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
      <div className="mt-4 ml-4 hidden h-12 items-center md:flex">
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
      <SidebarContent
        userId={userId}
        expanded={expanded}
        hovered={hovered}
        setChatOptionsOpened={setChatOptionsOpened}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        fromDesktop
      />
    </div>
  );
};

export default DesktopSidebar;
