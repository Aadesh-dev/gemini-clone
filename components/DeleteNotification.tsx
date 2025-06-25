import React from "react";
import { ToastContentProps } from "react-toastify";

const DeleteNotification = ({
  data,
}: ToastContentProps<{ chatTitle: string }>) => {
  return (
    <div className="w-full text-[14px] leading-5 overflow-ellipsis text-[#f2f2f2]">
      Deleted <b>{data.chatTitle}</b>
    </div>
  );
};

export default DeleteNotification;
