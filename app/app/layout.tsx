import Gemini from "@/components/Gemini";
import ModelsDialog from "@/components/ModelsDialog";
import Sidebar from "@/components/Sidebar";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const { userId } = await auth();

  return (
    <Gemini>
      <main className="flex min-h-screen w-full flex-col lg:flex-row">
        <Sidebar userId={userId} />
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center">
            <div className="mt-3 mb-[10px] ml-[10px]">
              <ModelsDialog />
            </div>
            {userId ? (
              <UserButton />
            ) : (
              <button className="button bg-purple-gradient bg-cover">
                <Link href="/sign-in">Sign in</Link>
              </button>
            )}
          </div>
          {children}
        </div>
      </main>
    </Gemini>
  );
};

export default Layout;
