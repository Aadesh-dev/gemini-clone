import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import HelpIcon from "../icons/HelpIcon";
import RightArrowIcon from "../icons/RightArrowIcon";
import SettingsIcon from "../icons/SettingsIcon";
import ThemeIcon from "../icons/ThemeIcon";
import ThemeDialog from "./ThemeDialog";
import HelpDialog from "./HelpDialog";

const SettingsDialog = ({ finalExpanded }: { finalExpanded: true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);

  const dialogContentClass =
    "left-[133px] top-auto bottom-[36px] w-[300px] gap-0 bg-[#f0f4f9] px-0 py-2 text-[14px] shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] border-none";

  const settingsButtonClass = `rounded-[20px] mt-6 mb-7 hover:bg-[rgba(87,91,95,0.08)] flex items-center h-12 md:h-10 transition-width duration-300 ease-in-out overflow-hidden cursor-pointer disabled:pointer-events-none ${
    finalExpanded
      ? "w-[calc(100%-24px)] mx-1 md:mx-3"
      : "w-10 rounded-full mx-4 justify-center px-2"
  } ${isOpen ? "bg-[#d3e3fd]" : ""}`;

  const settingsTextClass = `my-2 text-[14px] transition-opacity duration-300 ease-in-out ${
    finalExpanded ? "opacity-100 block" : "opacity-0 hidden"
  } ${isOpen ? "text-[#0842a0] font-medium" : "text-[#575b5f]"}`;

  const settingsOptionClass =
    "h-12 cursor-pointer pr-6 pl-3 text-[#1f1f1f] hover:bg-[rgba(31,31,31,0.08)]";

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className={settingsButtonClass}>
          <span className={finalExpanded ? "mr-4 ml-[14px]" : ""}>
            <SettingsIcon fill={isOpen ? "#0842a0" : "#575B5F"} />
          </span>
          <span className={settingsTextClass}>Settings & help</span>
        </DialogTrigger>
        <DialogContent
          className={dialogContentClass}
          onClick={() => setIsOpen(false)}
          style={{ borderRadius: 16 }}
        >
          <DialogTitle className="sr-only">Settings options</DialogTitle>
          <button
            className={settingsOptionClass}
            onMouseEnter={() => {
              setIsThemeDialogOpen(true);
              setIsHelpDialogOpen(false);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex">
                <ThemeIcon />
                <span className="ml-3">Theme</span>
              </div>
              <RightArrowIcon />
            </div>
          </button>
          <button
            className={settingsOptionClass}
            onMouseEnter={() => {
              setIsHelpDialogOpen(true);
              setIsThemeDialogOpen(false);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex">
                <HelpIcon />
                <span className="ml-3">Help</span>
              </div>
              <RightArrowIcon />
            </div>
          </button>
        </DialogContent>
      </Dialog>
      <ThemeDialog
        isOpen={isThemeDialogOpen}
        setIsOpen={setIsThemeDialogOpen}
      />
      <HelpDialog isOpen={isHelpDialogOpen} setIsOpen={setIsHelpDialogOpen} />
    </>
  );
};

export default SettingsDialog;
