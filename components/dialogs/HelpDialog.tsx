import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PrivacyIcon from "../icons/PrivacyIcon";
import Link from "next/link";

const HelpDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const dialogContentClass =
    "left-[430px] top-auto bottom-[50px] w-[134px] gap-0 bg-[#f0f4f9] px-0 py-2 text-[14px] shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] border-none";

  const helpOptionClass =
    "h-12 cursor-pointer pr-6 pl-3 text-[#1f1f1f] hover:bg-[rgba(31,31,31,0.08)] flex w-full items-center";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DialogTrigger></DialogTrigger>
      <DialogContent
        className={dialogContentClass}
        onClick={() => setIsOpen(false)}
        style={{ borderRadius: 16 }}
      >
        <DialogTitle className="sr-only">Help options</DialogTitle>
        <Link
          href="https://support.google.com/gemini?p=privacy_help"
          className={helpOptionClass}
          target="_blank"
        >
          <div className="flex">
            <PrivacyIcon />
            <span className="ml-3">Privacy</span>
          </div>
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
