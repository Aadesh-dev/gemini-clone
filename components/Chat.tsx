"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserContext } from "@/lib/contexts";
import Image from "next/image";
import React, { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import Input from "./Input";

type ChatEntry = {
  prompt: string;
  answer: string;
};

const Chat = () => {
  const [chat, setChat] = useState<ChatEntry[]>([]);
  const user = useContext(UserContext);

  return (
    <div className="flex flex-col justify-between items-center w-[-webkit-fill-available]">
      <div className="fixed w-[-webkit-fill-available] top-0 bg-white pt-[18px] pb-4 pl-4">
        <div className="text-xl font-[sans-serif]">
          <Dialog>
            <DialogTrigger className="hover:bg-gray-200 flex items-center rounded-lg py-1 px-2 h-10 gap-1">
              <span>Gemini</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#444746"
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
            </DialogTrigger>
            <DialogContent className="top-[58px] left-[336px] bg-[#f0f4f9] w-80 py-2 px-0 gap-0 shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)]">
              <button className="flex gap-3 h-12 items-center hover:bg-gray-200 px-4">
                <Image
                  alt="Gemini logo"
                  width={24}
                  height={24}
                  src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg"
                ></Image>
                <div className="flex justify-between w-full items-center">
                  <div className="flex flex-col text-left">
                    <span className="text-[14px] font-medium">Gemini</span>
                    <span className="text-[12px]">with 1.5 Flash</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#444746"
                    className="mr-3"
                  >
                    <path d="m429-336 238-237-51-51-187 186-85-84-51 51 136 135Zm51 240q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                  </svg>
                </div>
              </button>
              <div className="flex items-center">
                <button
                  className="flex gap-3 h-12 items-center px-4 opacity-[0.38] w-full"
                  disabled
                >
                  <Image
                    alt="Gemini logo"
                    width={24}
                    height={24}
                    src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_advanced_1743d7b7a7bc01f38e6f4.svg"
                  ></Image>
                  <div className="flex justify-between w-full items-center">
                    <div className="flex flex-col text-left">
                      <span className="text-[14px] font-medium">
                        Gemini Advanced
                      </span>
                      <span className="text-[12px]">with 1.5 Pro</span>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() =>
                    window.open(
                      "https://one.google.com/explore-plan/gemini-advanced",
                      "_blank"
                    )
                  }
                  className="text-[#0842A0] bg-[#e9eef6] hover:bg-[rgba(100,149,237,0.2)] px-6 mr-4 rounded-[9999px] h-10 text-[14px] font-medium hover:shadow-[0_2px_1px_-1px_rgba(0,0,0,.2),0_1px_1px_0_rgba(0,0,0,.14),0_1px_3px_0_rgba(0,0,0,.12)]"
                >
                  Upgrade
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {chat.length ? (
        <div className="w-full relative top-[66px] h-[calc(100vh-184px)] overflow-y-auto">
          <div className="max-w-[724px] w-full mx-auto">
            {chat.map((chatItem: ChatEntry, index: number) => (
              <React.Fragment key={index}>
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
                      <ReactMarkdown>{chatItem.prompt}</ReactMarkdown>
                    </div>
                  </div>
                </div>
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
                          <stop offset="0.0671246" stop-color="#9168C0" />
                          <stop offset="0.342551" stop-color="#5684D1" />
                          <stop offset="0.672076" stop-color="#1BA1E3" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="prose">
                    <ReactMarkdown>{chatItem.answer}</ReactMarkdown>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid place-items-center w-full relative top-[66px] h-[calc(100vh-184px)]">
          <p className="text-transparent bg-[length:400%_100%] bg-clip-text [-webkit-text-fill-color:transparent] text-[32px] leading-10 font-medium bg-[linear-gradient(74deg,_#4285f4_0%,_#9b72cb_9%,_#d96570_20%,_#d96570_24%,_#9b72cb_35%,_#4285f4_44%,_#9b72cb_50%,_#d96570_56%,_#ffffff_75%,_#ffffff_100%)]">
            Hello, {user?.firstName}
          </p>
        </div>
      )}
      <div className="flex flex-col items-center w-[-webkit-fill-available] fixed bottom-0 bg-white">
        <Input setChat={setChat} />
        <p className="my-4 text-xs text-[#444746] leading-4 h-4">
          {chat.length ? "Gemini can make mistakes, so double-check it" : ""}
        </p>
      </div>
    </div>
  );
};

export default Chat;
