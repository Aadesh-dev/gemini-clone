import { ChatType } from "@/app/types";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";
import SignIn from "../SignIn";
import SidebarContent from "./SidebarContent";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const MobileSidebar = ({
  isOpen,
  onOpenChange,
  userId,
  expanded,
  setExpanded,
  hovered,
  setChatOptionsOpened,
  setIsDeleteDialogOpen,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  userId: string | null;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  hovered: boolean;
  setChatOptionsOpened: React.Dispatch<React.SetStateAction<ChatType | null>>;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger></SheetTrigger>
      <SheetContent
        side="left"
        className="w-[85vw] bg-[var(--color-main-background)] sm:max-w-[85vw]"
      >
        <div className="fixed top-0 flex h-18 w-full items-center justify-end bg-[var(--color-main-background)] pr-3">
          <div className="mx-2 flex items-center">
            <SignedOut>
              <SignIn className="inline-block min-w-24 rounded border-1 border-transparent bg-[var(--color-signin-button-background)] py-[9px] text-center text-sm leading-4 font-medium text-[var(--color-signin-button-text)] hover:bg-[var(--color-signin-button-hover-background)]" />
            </SignedOut>
            <SignedIn>
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
            </SignedIn>
          </div>
        </div>
        <SidebarContent
          userId={userId}
          expanded={expanded}
          setExpanded={setExpanded}
          hovered={hovered}
          setChatOptionsOpened={setChatOptionsOpened}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
