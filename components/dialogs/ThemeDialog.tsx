import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from "next-themes";
import CheckmarkIcon from "../icons/CheckmarkIcon";

const ThemeDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
  };

  const dialogContentClass =
    "left-[430px] top-auto bottom-[36px] w-[232px] gap-0 bg-[#f0f4f9] px-0 py-2 text-[14px] shadow-[0px_3px_1px_-2px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] border-none";

  const themeOptionClass =
    "h-12 cursor-pointer px-3 text-[#1f1f1f] hover:bg-[rgba(31,31,31,0.08)]";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DialogTrigger></DialogTrigger>
      <DialogContent
        className={dialogContentClass}
        onClick={() => setIsOpen(false)}
        style={{ borderRadius: 16 }}
      >
        <DialogTitle className="sr-only">Theme options</DialogTitle>
        <button
          className={themeOptionClass}
          onClick={(e) => {
            e.stopPropagation();
            handleThemeChange("system");
          }}
        >
          <div className="flex w-full items-center justify-between">
            <span>System</span>
            {theme === "system" && <CheckmarkIcon />}
          </div>
        </button>
        <button
          className={themeOptionClass}
          onClick={(e) => {
            e.stopPropagation();
            handleThemeChange("light");
          }}
        >
          <div className="flex w-full items-center justify-between">
            <span>Light</span> {theme === "light" && <CheckmarkIcon />}
          </div>
        </button>
        <button
          className={themeOptionClass}
          onClick={(e) => {
            e.stopPropagation();
            handleThemeChange("dark");
          }}
        >
          <div className="flex w-full items-center justify-between">
            <span>Dark</span> {theme === "dark" && <CheckmarkIcon />}
          </div>
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeDialog;
