"use client";

import { ChatType } from "@/app/types";
import { Message, useChat } from "@ai-sdk/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import Input from "./Input";

const Chat = ({
  chatID,
  initialMessages,
  chat,
}: {
  chatID: string;
  initialMessages?: Message[];
  chat: ChatType;
}) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    id: chatID, // use the provided chat ID
    initialMessages, // initial messages if provided
    sendExtraMessageFields: true, // send id and createdAt for each message
  });
  const searchParams = useSearchParams();
  const guest = searchParams.get("guest") ? true : false;

  return (
    <div className="flex flex-col justify-between items-center w-[-webkit-fill-available]">
      {messages.length ? (
        <div className="w-full relative top-[66px] h-[calc(100vh-184px)] overflow-y-auto">
          <div className="max-w-[724px] w-full mx-auto">
            {messages.map((m, index: number) => (
              <React.Fragment key={index}>
                {m.role === "user" ? (
                  <div className="flex py-2 mb-12">
                    <div className="mr-[20px]">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 28C14 26.0633 13.6267 24.2433 12.88 22.54C12.1567 20.8367 11.165 19.355 9.905 18.095C8.645 16.835 7.16333 15.8433 5.46 15.12C3.75667 14.3733 1.93667 14 0 14C1.93667 14 3.75667 13.6383 5.46 12.915C7.16333 12.1683 8.645 11.165 9.905 9.905C11.165 8.645 12.1567 7.16333 12.88 5.46C13.6267 3.75667 14 1.93667 14 0C14 1.93667 14.3617 3.75667 15.085 5.46C15.8317 7.16333 16.835 8.645 18.095 9.905C19.355 11.165 20.8367 12.1683 22.54 12.915C24.2433 13.6383 26.0633 14 28 14C26.0633 14 24.2433 14.3733 22.54 15.12C20.8367 15.8433 19.355 16.835 18.095 18.095C16.835 19.355 15.8317 20.8367 15.085 22.54C14.3617 24.2433 14 26.0633 14 28Z"
                          fill="url(#paint0_radial_16771_53212)"
                        />
                        <defs>
                          <radialGradient
                            id="paint0_radial_16771_53212"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(2.77876 11.3795) rotate(18.6832) scale(29.8025 238.737)"
                          >
                            <stop offset="0.0671246" stopColor="#9168C0" />
                            <stop offset="0.342551" stopColor="#5684D1" />
                            <stop offset="0.672076" stopColor="#1BA1E3" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="prose">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div className="flex py-2 mb-8">
                    <div className="mr-[20px]">
                      <Image
                        src="/profile-user.png"
                        alt="Example"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div>
                      <div className="prose">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid place-items-center w-full relative top-[66px] h-[calc(100vh-184px)]">
          <p className="text-transparent pointer-events-none bg-[length:400%_100%] bg-clip-text [-webkit-text-fill-color:transparent] text-[32px] leading-10 font-medium bg-[linear-gradient(74deg,_#4285f4_0%,_#9b72cb_9%,_#d96570_20%,_#d96570_24%,_#9b72cb_35%,_#4285f4_44%,_#9b72cb_50%,_#d96570_56%,_#ffffff_75%,_#ffffff_100%)]">
            Hello, {guest ? "Guest" : !(typeof(chat.user) === "string") ? chat.user.firstName : ""}
          </p>
        </div>
      )}
      <div className="flex flex-col items-center w-[-webkit-fill-available] fixed bottom-0 bg-white">
        <Input
          chatID={chatID}
          input={input}
          chat={chat}
          guest={guest}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <p className="my-4 text-xs text-[#444746] leading-4 h-4">
          {messages.length
            ? "Gemini can make mistakes, so double-check it"
            : ""}
        </p>
      </div>
    </div>
  );
};

export default Chat;
