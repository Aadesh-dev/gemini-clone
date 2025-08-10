import { Source_Code_Pro } from "next/font/google";
import { HTMLAttributes, ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { toast } from "react-toastify";
import CopiedNotification from "./CopiedNotification";
import CopyIcon from "./icons/CopyIcon";

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
          "relative rounded-[6px] bg-[var(--color-modal-upgrade-button-background)] px-[6px] py-[1px] text-[14px] text-[var(--color-code-chips)] " +
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
        className="absolute top-3 right-3 flex cursor-pointer items-center rounded-full p-1 hover:bg-[rgba(87,91,95,0.08)] dark:hover:bg-[#3d3f42]"
      >
        <CopyIcon />
      </button>

      <SyntaxHighlighter
        language={language}
        customStyle={{
          backgroundColor: "var(--color-sidebar-background)",
          borderRadius: 16,
          fontSize: 14,
          padding: 16,
          marginTop: 16,
          marginBottom: 16,
        }}
        codeTagProps={{
          className: code.className,
          style: { whiteSpace: "break-spaces" },
        }}
      >
        {codeToRender}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
