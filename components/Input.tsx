"use client";

import { ChatType } from "@/app/types";
import { getChatTitle } from "@/lib/actions/chat.actions";
import { ChatInfoContext } from "@/lib/contexts";
import { ChatRequestOptions } from "ai";
import React, {
  useContext,
  useRef,
  useState
} from "react";

const Input = ({
  chatID,
  userId,
  input,
  chat,
  handleInputChange,
  handleSubmit,
}: {
  chatID: string;
  userId: string | null;
  input: string;
  chat: ChatType;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
}) => {
  //State
  const [inputFocused, setInputFocused] = useState(false);
  const [title, setTitle] = useState(chat.title);
  const [height, setHeight] = useState(24);

  //Context
  const context = useContext(ChatInfoContext);

  //Other
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!context) {
    throw new Error("Chat must be used within a ChatInfoContext.Provider");
  }

  const { setChatInfo } = context;

  const onPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //setPrompt(e.target.value);
    handleInputChange(e);
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to measure the content height accurately
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
    let newTitle = title;
    if (title === "New Chat") {
      newTitle = await getChatTitle(input);
      setChatInfo({ _id: chatID, title: newTitle });
      setTitle(newTitle);
    }

    handleSubmit(event, {
      body: {
        title: newTitle.trim(),
        userId,
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
    <form
      className={`flex items-center w-full max-w-[830px] sticky bottom-0 ${
        inputFocused
          ? "bg-[var(--text-focused-background)]"
          : "bg-[var(--text-background)]"
      } py-[4px] pl-[26px] pr-[12px]`}
      onSubmit={onPromptSubmit}
      style={{ borderRadius: height <= 24 ? 32 : 16 }}
    >
      <textarea
        value={input}
        ref={textareaRef}
        rows={1}
        placeholder="Ask Gemini"
        className={
          "flex-1 outline-none bg-transparent resize-none overflow-hidden placeholder-[var(--form-field-placeholder)] my-[16px]"
        }
        onChange={onPromptChange}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        onKeyDown={handleKeyDown}
      />
      <button
        className={`ml-2 px-2 py-[8px] h-10 hover:bg-gray-200 rounded-full cursor-pointer ${
          input
            ? "transition-all duration-500 opacity-100 scale-100 visible pointer-events-auto"
            : "transition-none opacity-0 scale-75 invisible pointer-events-none"
        }`}
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#444746"
        >
          <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
        </svg>
      </button>
    </form>
  );
};

export default Input;
