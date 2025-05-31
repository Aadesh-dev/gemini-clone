"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserContext } from "@/lib/contexts";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import CheckmarkIcon from "./icons/CheckmarkIcon";

const ModelsDialog = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("Chat must be used within a UserContext.Provider");
  }

  const { user } = userContext;

  const [isOpen, setIsOpen] = useState(false);

  const dialogContentClass = `${user && user.sidebarExpanded ? "left-[22%]" : "left-[6%]"} top-[12.5%] w-80 gap-0 bg-[#f0f4f9] px-0 py-5 shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] border-none`;

  const onModelClick = () => {
    router.push("/app/");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex cursor-pointer flex-col gap-1 px-2">
        <span className="text-left text-[20px] leading-7 text-[#1B1C1D]">
          Gemini
        </span>
        <div className="flex rounded-2xl bg-[#f0f4f9] pr-1 pl-3 text-[#575b5f] hover:bg-[#dde3ea]">
          <span className="text-[14px] font-medium">2.5 Flash</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={24}
            viewBox="0 -960 960 960"
            width={24}
            fill="#575b5f"
          >
            <path d="M480-360 280-560h400L480-360Z" />
          </svg>
        </div>
      </DialogTrigger>
      <DialogContent
        className={dialogContentClass}
        onClick={() => setIsOpen(false)}
      >
        <DialogTitle className="sr-only">Change Gemini model</DialogTitle>
        <DialogHeader className="px-5 pb-2 text-[14px] leading-5 font-medium text-[#727676]">
          Choose your model
        </DialogHeader>
        <button
          className="h-12 cursor-pointer items-center pr-4 pl-5 text-[#1f1f1f] hover:bg-[rgba(31,31,31,0.08)]"
          onClick={onModelClick}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col text-left text-xs">
              <span className="font-medium">2.5 Flash</span>
              <span>Our next reasoning model built for speed</span>
            </div>
            <CheckmarkIcon />
          </div>
        </button>
        <div className="flex items-center gap-3 px-5">
          <div className="flex flex-col text-left text-xs">
            <span className="font-medium">Upgrade to Gemini Advanced</span>
            <span>Get our most capable models & features</span>
          </div>
          <button
            onClick={() =>
              window.open(
                "https://one.google.com/explore-plan/gemini-advanced",
                "_blank",
              )
            }
            className="h-10 cursor-pointer rounded-full bg-[#e9eef6] px-6 text-[14px] font-medium text-[#0842A0] hover:bg-[rgba(100,149,237,0.2)] hover:shadow-[0_2px_1px_-1px_rgba(0,0,0,.2),0_1px_1px_0_rgba(0,0,0,.14),0_1px_3px_0_rgba(0,0,0,.12)]"
          >
            Upgrade
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModelsDialog;
