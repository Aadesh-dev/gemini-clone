"use client";

import { ChatType } from "@/app/types";
import React, { useState } from "react";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const newChatTextClass = expanded
    ? "block ml-4 mr-2 my-2 text-[14px] text-[#444746]"
    : "hidden ml-4 mr-2 my-2 text-[14px] text-[#444746]";

  const newChatButtonClass = expanded
    ? "rounded-[20px] mx-2 px-2 bg-[#dde3ea] hover:bg-[rgba(100,149,237,0.2)] flex items-center font-medium h-10 transition-width"
    : "rounded-[9999px] mx-2 px-2 bg-[#dde3ea] hover:bg-[rgba(100,149,237,0.2)] flex items-center font-medium h-10 transition-width";

  return (
    <div
      className={
        expanded
          ? "w-[320px] bg-[#f0f4f9] shrink-0 transition-width"
          : "w-[72px] bg-[#f0f4f9] shrink-0 transition-width"
      }
    >
      <div className="h-12 mt-3 ml-4 flex items-center">
        <button
          onClick={() => setExpanded(!expanded)}
          className="h-10 w-10 p-2 rounded-[9999px] hover:bg-gray-200 flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#444746"
          >
            <path d="M144-264v-72h672v72H144Zm0-180v-72h672v72H144Zm0-180v-72h672v72H144Z" />
          </svg>
        </button>
      </div>
      <div className="mt-[44px]">
        <div className="pl-2 pb-4">
          <button className={newChatButtonClass}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#444746"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
            <span className={newChatTextClass}>New chat</span>
          </button>
        </div>
        <div className="px-3 pb-2">
          <div className="pl-3 py-2">
            <h1 className="text text-[14px] font-medium">Recent</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
