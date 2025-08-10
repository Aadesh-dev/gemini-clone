import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";
import OptionsIcon from "./icons/OptionsIcon";

const OptionsDrawer = ({
  setIsDeleteDialogOpen,
}: {
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <OptionsIcon
          width="29px"
          height="29px"
          fontSize={29}
          fill="var(--color-header-options-icon)"
        />
      </DrawerTrigger>
      <DrawerContent className="h-49 bg-[var(--color-options-drawer-background)] pt-3 pb-6">
        <button
          className="flex h-12 w-full cursor-pointer items-center pl-4 text-[var(--color-text-secondary)]"
          onClick={() => {
            setIsDeleteDialogOpen(true);
            setIsOpen(false);
          }}
        >
          <DeleteIcon width="29px" height="29px" />
          <span className="ml-4">Delete</span>
        </button>
      </DrawerContent>
    </Drawer>
  );
};

export default OptionsDrawer;
