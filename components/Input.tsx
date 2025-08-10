"use client";

import { ChatType } from "@/app/types";
import { getChatTitle } from "@/lib/actions/chat.actions";
import { ChatsContext, ModelContext, UserContext } from "@/lib/contexts";
import { ChatRequestOptions } from "ai";
import React, { useContext, useRef, useState } from "react";
import SendIcon from "./icons/SendIcon";
import StopIcon from "./icons/StopIcon";
import axios from "axios";
import { handleError } from "@/lib/utils";

const Input = ({
  chatID,
  userId,
  input,
  chat,
  handleInputChange,
  handleSubmit,
  height,
  setHeight,
  status,
  stop,
}: {
  chatID: string;
  userId: string | null;
  input: string;
  chat: ChatType;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions,
  ) => void;
  height: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  status: string;
  stop: () => void;
}) => {
  //State
  const [title, setTitle] = useState(chat.title);

  //chatsContext
  const chatsContext = useContext(ChatsContext);
  const modelContext = useContext(ModelContext);
  const userContext = useContext(UserContext);

  //Other
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!chatsContext) {
    throw new Error("Chat must be used within a ChatsContext.Provider");
  }

  if (!modelContext) {
    throw new Error("Chat must be used within a ModelContext.Provider");
  }

  if (!userContext) {
    throw new Error("Chat must be used within a UserContext.Provider");
  }

  const { chats, setChats } = chatsContext;
  const { model } = modelContext;
  const { user, setUser } = userContext;

  const onPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset heights to measure the content height accurately
      textarea.style.height = "auto";

      // Calculate new height based on scrollHeight
      const lineHeight = 24; // Height per line
      const newHeight = (textarea.scrollHeight / lineHeight) * lineHeight;

      setHeight(newHeight);
      textarea.style.height = `${newHeight}px`;
    }
  };

  const onPromptSubmit = async (event?: {
    preventDefault?: () => void;
  }): Promise<void> => {
    if (event?.preventDefault) event?.preventDefault();
    if (input.trim() === "") {
      return; // Prevent submission if input is empty
    }
    let newTitle = title;
    if (title === "New Chat") {
      newTitle = await getChatTitle(input, model);
      setTitle(newTitle);

      const chatIndex = chats.findIndex((c) => c._id === chatID);
      const currentChat = structuredClone(chats[chatIndex]);
      currentChat.title = newTitle;
      currentChat.messages.push({
        id: "id",
        content: "content",
        role: "user",
      });
      const newChats = [
        ...chats.slice(0, chatIndex),
        currentChat,
        ...chats.slice(chatIndex + 1),
      ];
      setChats(newChats);
    }

    if (userId && user) {
      setUser({ ...user, showIntroMessage: false });

      try {
        await axios.put("/api/user", {
          clerkID: userId,
          user: { ...user, showIntroMessage: false },
        });
      } catch (error: any) {
        handleError(error);
      }
    }

    handleSubmit(event, {
      body: {
        title: newTitle.trim(),
        userId,
        model,
      },
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents adding a new line
      onPromptSubmit(); // Calls submit function
    }
  };

  return (
    <div
      className="max-h-[204px] w-full border border-solid border-[var(--color-input-border)] transition-[border-radius,height] duration-[100ms,250ms] ease-[cubic-bezier(.2,0,0,1),cubic-bezier(.2,0,0,1)]"
      style={{ borderRadius: height <= 24 ? 32 : 16, height: 36 + height }}
    >
      <form className="flex p-2 pl-4" onSubmit={onPromptSubmit}>
        <textarea
          value={input}
          ref={textareaRef}
          rows={1}
          placeholder="Ask Gemini"
          className={
            "my-[9px] max-h-[168px] flex-1 resize-none overflow-auto bg-transparent pr-[15px] text-[var(--color-text-tertiary)] placeholder-[var(--color-input-placeholder)] outline-none"
          }
          onChange={onPromptChange}
          onKeyDown={handleKeyDown}
        />
        {status === "submitted" || status === "streaming" ? (
          <button
            className="ml-2 h-fit cursor-pointer self-end rounded-[50%] bg-[var(--color-sidebar-background)] p-[9px]"
            onClick={() => stop()}
          >
            <StopIcon />
          </button>
        ) : (
          <button
            className={`ml-2 h-fit cursor-pointer rounded-[50%] bg-[var(--color-sidebar-background)] p-[9px] hover:bg-[var(--color-upgrade-button-background)] ${
              input
                ? "pointer-events-auto visible scale-100 opacity-100 transition-all duration-500"
                : "pointer-events-none invisible scale-75 opacity-0 transition-none"
            } self-end`}
            type="submit"
          >
            <SendIcon />
          </button>
        )}
      </form>
    </div>
  );
};

export default Input;
