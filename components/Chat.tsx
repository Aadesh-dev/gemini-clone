"use client";

import { ChatType } from "@/app/types";
import { getChatsByClerkID } from "@/lib/actions/chat.actions";
import { ChatsContext, UserContext } from "@/lib/contexts";
import {
  fixBrokenMarkdownTables,
  handleError,
  stripTableCodeFencesOnly,
} from "@/lib/utils";
import { Message, useChat } from "@ai-sdk/react";
import { SignedOut } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import Input from "./Input";
import LoadingStarIcon from "./LoadingStarIcon";
import GeminiStarIcon from "./icons/GeminiStarIcon";
import { Source_Code_Pro } from "next/font/google";
import CodeBlock from "./CodeBlock";
import CloseIcon from "./icons/CloseIcon";
import axios from "axios";

const code = Source_Code_Pro({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const Chat = ({
  chatID,
  userId,
  chat,
  initialMessages,
}: {
  chatID: string;
  userId: string | null;
  chat: ChatType;
  initialMessages?: Message[];
}) => {
  //State
  const [height, setHeight] = useState(24);
  const [showIntroMessage, setShowIntroMessage] = useState(false);

  //Other
  const { input, handleInputChange, handleSubmit, messages, status, stop } =
    useChat({
      id: chatID, // use the provided chat ID
      initialMessages, // initial messages if provided
      sendExtraMessageFields: true, // send id and createdAt for each message
    });

  //Context
  const chatsContext = useContext(ChatsContext);
  const userContext = useContext(UserContext);

  if (!chatsContext) {
    throw new Error("Chat must be used within a ChatsContext.Provider");
  }

  if (!userContext) {
    throw new Error("Chat must be used within a UserContext.Provider");
  }

  const { chats, setChats } = chatsContext;
  const { user, setUser } = userContext;

  const handleIntroMessageClose = async () => {
    setShowIntroMessage(!showIntroMessage);
    if (user) {
      setUser({ ...user, showIntroMessage: !showIntroMessage });

      try {
        await axios.put("/api/user", {
          clerkID: userId,
          user: { ...user, showIntroMessage: !showIntroMessage },
        });
      } catch (error: any) {
        handleError(error);
      }
    }
  };

  useEffect(() => {
    const newChat: ChatType = {
      _id: chat._id,
      title: chat.title,
      messages,
      user: chat.user,
    };
    if (!chats.length) {
      if (userId) {
        getChatsByClerkID(userId).then((chats) => {
          if (newChat.messages.length) {
            setChats(chats.reverse());
          } else {
            setChats([newChat, ...chats.reverse()]);
          }
        });
      } else {
        setChats([newChat]);
      }
    } else if (!chats.find((c) => c._id === chatID)) {
      setChats([newChat, ...chats]);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      setShowIntroMessage((user && user.showIntroMessage) || false);
    }
  }, [user, chats]);

  return (
    <div className="flex flex-col items-center justify-between px-4 bg-white dark:bg-gray-900">
      {messages.length ? (
        <div
          className="w-full overflow-y-auto pt-4 pr-4 pb-5 pl-7"
          style={{
            height: `calc(100vh - ${156 + (height <= 168 ? height : 168)}px)`,
          }}
        >
          <div className="mx-auto w-[760px] leading-7 text-gray-900 dark:text-gray-100">
            {messages.map((m, index: number) => (
              <React.Fragment key={index}>
                {m.role === "user" ? (
                  <div className="flex justify-end py-4 md:py-2">
                    <div className="ml-13 max-md:mt-3 md:pb-6">
                      <div className="prose mb-2 max-w-[452px] rounded-tl-3xl rounded-tr-[4px] rounded-b-3xl bg-gray-100 dark:bg-gray-800 px-4 py-3">
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                        >
                          {fixBrokenMarkdownTables(m.content)}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-8 md:mb-9 md:flex">
                    {index === messages.length - 1 && status === "streaming" ? (
                      <LoadingStarIcon />
                    ) : (
                      <div className="max-md:h-10 md:mr-5">
                        <GeminiStarIcon width={32} height={32} />
                      </div>
                    )}
                    <div className="pt-1">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          table: ({ children }) => (
                            <div className="overflow-auto rounded-2xl bg-gray-50 dark:bg-gray-800">
                              <table className="min-w-full table-auto border-collapse text-left text-sm">
                                {children}
                              </table>
                            </div>
                          ),
                          thead: ({ children }) => (
                            <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
                          ),
                          th: ({ children }) => (
                            <th className="px-3 py-2 font-normal">
                              <p className="mb-4">{children}</p>
                            </th>
                          ),
                          td: ({ children }) => (
                            <td className="px-3 py-2">
                              <p className="mb-4">{children}</p>
                            </td>
                          ),
                          code: CodeBlock,
                        }}
                      >
                        {stripTableCodeFencesOnly(m.content)}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
            {status === "submitted" && (
              <div className="mb-9 flex">
                <LoadingStarIcon />
                <p className="text-gray-900 dark:text-gray-100">Just a sec...</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className="flex w-full justify-center overflow-y-auto pt-4 pr-4 pb-[6px] pl-7"
          style={{
            height: `calc(100vh - ${156 + (height <= 168 ? height : 168)}px)`,
          }}
        >
          {userId && (
            <h1 className="relative bottom-[15%] mx-auto self-center text-center text-[32px] leading-10 font-medium select-none">
              <span className="bg-[linear-gradient(74deg,_rgb(66,133,244)_0px,_rgb(155,114,203)_9%,_rgb(217,101,112)_20%,_rgb(217,101,112)_24%,_rgb(155,114,203)_35%,_rgb(66,133,244)_44%,_rgb(155,114,203)_50%,_rgb(217,101,112)_56%,_rgb(255,255,255)_75%,_rgb(255,255,255)_100%)] bg-[length:400%_100%] bg-clip-text text-transparent">
                Hello, {user?.firstName}
              </span>
            </h1>
          )}
          <SignedOut>
            <h1 className="relative bottom-[15%] mx-auto w-[725px] self-center text-center text-[36px] leading-13 font-medium select-none md:text-[45px]">
              <span className="text-gray-900 dark:text-gray-100">Meet&nbsp;</span>
              <span className="bg-[linear-gradient(26.72deg,_#4285f4_55.92%,_#9b72cb_64.05%,_#d96570_70.93%)] bg-[length:100%_200%] bg-clip-text text-transparent">
                Gemini
              </span>
              <span className="text-gray-900 dark:text-gray-100">,</span>
              <br />
              <span className="text-gray-900 dark:text-gray-100">your personal AI assistant</span>
            </h1>
          </SignedOut>
        </div>
      )}
      <div className="absolute bottom-0 w-full px-4">
        {showIntroMessage && (
          <div className="mx-auto mb-4 w-[760px] max-w-full rounded-2xl bg-gray-100 dark:bg-gray-800 px-6 py-5 text-gray-900 dark:text-gray-100">
            <div className="mt-1 mb-3 flex w-full items-center justify-between">
              <p className="text-xl font-medium">
                Welcome to{" "}
                <span className="bg-[linear-gradient(26.72deg,_#4285f4_55.92%,_#9b72cb_64.05%,_#d96570_70.93%)] bg-[length:100%_200%] bg-clip-text text-transparent">
                  Gemini
                </span>
                , your personal AI assistant
              </p>
              <button
                className="cursor-pointer rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={handleIntroMessageClose}
              >
                <CloseIcon />
              </button>
            </div>
            <p className="mb-2 text-xs">
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                className="leading-4 text-blue-600 dark:text-blue-400 underline"
              >
                Google Terms
              </a>{" "}
              and the{" "}
              <a
                href="https://support.google.com/bard/answer/13594961"
                target="_blank"
                className="leading-4 text-blue-600 dark:text-blue-400 underline"
              >
                Gemini Apps Privacy Notice
              </a>{" "}
              apply. Chats are reviewed and used to improve Google AI.{" "}
              <a
                href="https://myactivity.google.com/product/gemini?utm_source=gemini"
                target="_blank"
                className="leading-4 text-blue-600 dark:text-blue-400 underline"
              >
                Learn about your choices
              </a>
              . Gemini can make mistakes, so double-check it. Info{" "}
              <a
                href="https://support.google.com/gemini/answer/13594961#location&zippy=%2Cwhat-location-information-do-gemini-apps-collect-why-and-how-is-it-used"
                target="_blank"
                className="leading-4 text-blue-600 dark:text-blue-400 underline"
              >
                about your location
              </a>{" "}
              is also stored with your Gemini Apps activity.
            </p>
          </div>
        )}
        <div className="relative flex w-full justify-center bg-white dark:bg-gray-900 before:absolute before:top-[-50px] before:bottom-0 before:z-0 before:h-[100px] before:w-full before:bg-[linear-gradient(180deg,_rgba(255,255,255,0)_0px,_rgba(255,255,255,100)_60%)] dark:before:bg-[linear-gradient(180deg,_rgba(17,24,39,0)_0px,_rgba(17,24,39,100)_60%)] before:content-['']">
          <div className="z-[1] w-[760px]">
            <Input
              chatID={chatID}
              userId={userId}
              input={input}
              chat={chat}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              height={height}
              setHeight={setHeight}
              status={status}
              stop={stop}
            />
            <p className="my-4 h-4 text-center text-xs leading-4 text-gray-600 dark:text-gray-400">
              {messages.length ? (
                "Gemini can make mistakes, so double-check it"
              ) : (
                <SignedOut>
                  <a
                    className="underline"
                    href="https://policies.google.com/terms"
                  >
                    Google Terms
                  </a>{" "}
                  and the{" "}
                  <a
                    className="underline"
                    href="https://policies.google.com/privacy"
                  >
                    Google Privacy Policy
                  </a>{" "}
                  apply. Gemini can make mistakes, so double-check it.
                </SignedOut>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
