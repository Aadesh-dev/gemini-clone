import React from "react";
import { ToastContentProps } from "react-toastify";

const CopiedNotification = ({ data }: ToastContentProps<{ text: string }>) => {
  return (
    <div className="w-full text-[14px] leading-5 overflow-ellipsis text-[#f2f2f2]">
      {data.text}
    </div>
  );
};

export default CopiedNotification;
