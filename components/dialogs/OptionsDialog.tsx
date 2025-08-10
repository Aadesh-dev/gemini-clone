import { useState } from "react";

import { ChatType } from "@/app/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OptionsIcon from "../icons/OptionsIcon";
import DeleteIcon from "../icons/DeleteIcon";

const OptionsDialog = ({
  currentChat,
  chat,
  setChatOptionsOpened,
  setIsDeleteDialogOpen,
}: {
  currentChat: ChatType;
  chat: ChatType;
  setChatOptionsOpened: (chat: ChatType | null) => void;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getTop = () => {
    const element = document.getElementById(chat._id);
    if (element) {
      const rect = element.getBoundingClientRect();
      return rect.top - 6;
    }
    return 0; // Default value if the element is not found
  };

  const dialogContentClass =
    "left-[272px] w-[150px] gap-0 bg-[var(--color-dialog-background)] px-0 py-2 text-[14px] shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] border-none";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={
          currentChat && chat._id === currentChat._id
            ? "flex h-7 w-7 items-center justify-center rounded-full px-[6px] py-[1px] hover:bg-[var(--color-options-icon-hover-background)]"
            : "flex h-7 w-7 items-center justify-center rounded-full px-[6px] py-[1px] hover:bg-[var(--color-upgrade-button-background)]"
        }
        onClick={() => {
          setChatOptionsOpened(chat);
        }}
      >
        <OptionsIcon
          width="20px"
          height="20px"
          fontSize={20}
          fill={
            currentChat && chat._id === currentChat._id
              ? "var(--color-modal-upgrade-button-text)"
              : "var(--color-text-tertiary)"
          }
        />
      </DialogTrigger>
      <DialogContent
        className={dialogContentClass}
        onClick={() => setIsOpen(false)}
        style={{ top: getTop() }}
      >
        <DialogTitle className="sr-only">Chat options</DialogTitle>
        <button
          className="h-8 cursor-pointer px-3 text-[var(--color-text-secondary)] hover:bg-[var(--color-dialog-items-hover-background)]"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          <div className="flex w-full items-center">
            <DeleteIcon width="20px" height="20px" />
            <span className="ml-[10px]">Delete</span>
          </div>
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default OptionsDialog;
