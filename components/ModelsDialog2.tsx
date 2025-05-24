"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

const ModelsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 rounded-lg px-3 py-1 hover:bg-gray-100">
        <span className="text-base text-[#1f1f1f]">2.0 Flash</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 -960 960 960"
          width="20"
          fill="#444746"
        >
          <path d="M480-360 280-560h400L480-360Z" />
        </svg>
      </DialogTrigger>
      <DialogContent className="top-[58px] left-[10px] w-[400px] gap-0 rounded-xl bg-[#f8f9fc] px-0 py-2">
        <DialogTitle className="px-4 pb-2 text-2xl font-normal">
          Gemini
        </DialogTitle>
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 p-3 hover:bg-gray-100">
            <Image
              alt="Gemini logo"
              width={24}
              height={24}
              src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg"
            />
            <div className="flex flex-col text-left">
              <span className="text-[15px] font-medium">2.0 Flash</span>
              <span className="text-[13px] text-gray-600">
                Get everyday help
              </span>
            </div>
            <svg
              className="ml-auto"
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
              fill="#444746"
            >
              <path d="m424-408-86-86 42-42 44 44 126-126 42 42-168 168Zm56 328q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
            </svg>
          </button>
          {/* Add other model options as disabled buttons */}
          <button disabled className="flex items-center gap-3 p-3 opacity-50">
            <div className="flex flex-col text-left">
              <span className="text-[15px]">2.5 Flash (experimental)</span>
              <span className="text-[13px] text-gray-600">
                Uses advanced reasoning
              </span>
            </div>
          </button>
          {/* Add more model options here */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModelsDialog;
