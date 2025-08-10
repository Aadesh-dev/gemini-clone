import { useContext } from "react";

import { ChatType } from "@/app/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChatsContext } from "@/lib/contexts";
import { handleError } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import DeleteNotification from "../DeleteNotification";

const DeleteDialog = ({
  currentChat,
  chat,
  isOpen,
  setIsOpen,
}: {
  currentChat: ChatType;
  chat: ChatType | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  //Context
  const chatsContext = useContext(ChatsContext);

  //Other
  const router = useRouter();

  if (!chatsContext) {
    throw new Error("DeleteDialog must be used within a ChatsContext.Provider");
  }
  const { setChats } = chatsContext;

  const onDelete = async () => {
    if (chat) {
      try {
        await axios.delete("/api/chat", {
          data: { chatID: chat._id },
        });

        setIsOpen(false);
        setChats((prevChats: ChatType[]) =>
          prevChats.filter((c) => c._id !== chat._id),
        );

        if (chat._id === currentChat._id) {
          router.push("/app/");
        }

        toast(DeleteNotification, {
          data: {
            chatTitle: chat.title,
          },
          position: "bottom-left",
          autoClose: 3000,
        });
      } catch (error: any) {
        handleError(error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger></DialogTrigger>
      <DialogContent
        showBackdrop
        className="top-[50%] left-[50%] w-150 max-w-150 translate-x-[-50%] translate-y-[-50%] gap-0 border-none bg-[var(--color-delete-dialog-background)] p-0 text-[14px] sm:rounded-[28px]"
      >
        <DialogTitle className="sr-only">Delete chat?</DialogTitle>
        <DialogHeader className="px-6 pt-6 pb-[13px]">
          <h1 className="text-[24px] leading-8 text-[var(--color-text-tertiary)]">
            Delete chat?
          </h1>
        </DialogHeader>
        <div className="px-6">
          <p className="my-[14px] leading-5 text-[var(--color-text-primary)]">
            This will delete prompts, responses, and any content you created.
          </p>
          <a
            href="https://support.google.com/gemini?p=deleted_chats"
            className="leading-5 text-[var(--color-stop-button)] underline"
            target="_blank"
          >
            Learn more
          </a>
        </div>
        <div className="flex justify-end p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-fit cursor-pointer items-center rounded-full px-3 text-center text-sm font-medium text-[var(--color-stop-button)] hover:bg-[rgba(105,145,214,0.2)]"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="flex h-10 w-fit cursor-pointer items-center rounded-full px-3 text-center text-sm font-medium text-[var(--color-stop-button)] hover:bg-[rgba(105,145,214,0.2)]"
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
