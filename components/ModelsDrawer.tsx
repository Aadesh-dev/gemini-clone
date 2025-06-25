import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CheckmarkIcon from "./icons/CheckmarkIcon";
import { useRouter } from "next/navigation";

const ModelsDrawer = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const router = useRouter();

  const onModelClick = () => {
    router.push("/app/");
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger></DrawerTrigger>
      <DrawerContent className="h-49 bg-[#f0f4f9] pt-4 pb-7">
        <DrawerTitle className="sr-only">Change Gemini model</DrawerTitle>
        <DrawerHeader className="px-5 pt-0 pb-2 text-left text-[14px] leading-5 font-medium text-[#727676]">
          Choose your model
        </DrawerHeader>
        <button
          className="h-12 cursor-pointer items-center pr-4 pl-5 text-[#1f1f1f] hover:bg-[rgba(31,31,31,0.08)]"
          onClick={onModelClick}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col text-left text-xs">
              <span className="font-medium">2.5 Flash</span>
              <span>Fast all-around help</span>
            </div>
            <CheckmarkIcon />
          </div>
        </button>
        <div className="flex items-center justify-between gap-3 px-5">
          <div className="flex flex-col text-left text-xs">
            <span>Upgrade to Google AI Pro</span>
            <span>Get our most capable models & features</span>
          </div>
          <button
            onClick={() =>
              window.open(
                "https://one.google.com/explore-plan/gemini-advanced",
                "_blank",
              )
            }
            className="h-10 cursor-pointer rounded-full bg-[#e9eef6] px-6 text-[14px] text-[#0842A0] hover:bg-[rgba(100,149,237,0.2)] hover:shadow-[0_2px_1px_-1px_rgba(0,0,0,.2),0_1px_1px_0_rgba(0,0,0,.14),0_1px_3px_0_rgba(0,0,0,.12)]"
          >
            Upgrade
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ModelsDrawer;
