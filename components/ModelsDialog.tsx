"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

const ModelsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="hover:bg-gray-200 flex items-center rounded-lg py-1 px-2 h-10 gap-1">
        <span className="text-[#1B1C1D] text-[20px] leading-7">Gemini</span>
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
                <span className="text-[14px] font-medium">Gemini Advanced</span>
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
            className="text-[#0842A0] bg-[#e9eef6] hover:bg-[rgba(100,149,237,0.2)] px-6 mr-4 rounded-full h-10 text-[14px] font-medium hover:shadow-[0_2px_1px_-1px_rgba(0,0,0,.2),0_1px_1px_0_rgba(0,0,0,.14),0_1px_3px_0_rgba(0,0,0,.12)]"
          >
            Upgrade
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModelsDialog;
