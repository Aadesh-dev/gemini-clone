import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="flex justify-center items-center min-h-screen w-full bg-[#f0f4f9]">{children}</main>;
};

export default Layout;
