import { useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import HelpIcon from "../icons/HelpIcon";
import RightArrowIcon from "../icons/RightArrowIcon";
import ThemeIcon from "../icons/ThemeIcon";
import HelpDialog from "./HelpDialog";
import ThemeDialog from "./ThemeDialog";

const SettingsDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);

  const dialogContentClass =
    "left-[133px] top-auto bottom-[36px] w-[300px] gap-0 bg-[var(--color-dialog-background)] px-0 py-2 text-[14px] shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] border-none";

  const settingsOptionClass =
    "h-12 cursor-pointer pr-6 pl-3 text-[var(--color-text-secondary)] hover:bg-[var(--color-dialog-items-hover-background)]";

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
