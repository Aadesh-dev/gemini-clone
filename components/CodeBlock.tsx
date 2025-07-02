import { useState, ReactNode, HTMLAttributes } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Source_Code_Pro } from "next/font/google";
import CopyIcon from "./icons/CopyIcon";
import { toast } from "react-toastify";
import CopiedNotification from "./CopiedNotification";

const code = Source_Code_Pro({
  weight: ["400", "600"],
  subsets: ["latin"],
});

interface CodeBlockProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children?: ReactNode;
}

const CodeBlock = ({ className, children }: CodeBlockProps) => {
  const language = className?.replace("language-", "");
  const codeToRender = String(children).replace(/\n$/, "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeToRender);
    toast(CopiedNotification, {
      data: {
        text: "Copied to clipboard",
      },
      position: "bottom-left",
      autoClose: 3000,
    });
  };

  if (!language) {
    return (
      <code
        className={
          "relative rounded-[6px] bg-[#f0f4f9] px-[6px] py-[1px] text-[14px] " +
          code.className
        }
      >
        {children}
      </code>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex cursor-pointer items-center rounded-full p-1 hover:bg-[rgba(87,91,95,0.08)]"
      >
        <CopyIcon />
      </button>

      <SyntaxHighlighter
        language={language}
        customStyle={{
          backgroundColor: "#f0f4f9",
          borderRadius: 16,
          fontSize: 14,
          padding: 16,
          marginTop: 16,
          marginBottom: 16,
        }}
        codeTagProps={{ className: code.className }}
      >
        {codeToRender}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
