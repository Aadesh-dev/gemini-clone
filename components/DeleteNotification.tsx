import React from "react";
import { ToastContentProps } from "react-toastify";

const DeleteNotification = ({
  data,
}: ToastContentProps<{ chatTitle: string }>) => {
  return (
    <div className="w-full text-[14px] leading-5 overflow-ellipsis text-[var(--color-notification-text)]">
      Deleted <b>{data.chatTitle}</b>
    </div>
  );
};

export default DeleteNotification;
