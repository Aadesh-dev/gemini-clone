import Sidebar from "@/components/Sidebar";
import Gemini from "@/components/Gemini";
import ModelsDialog from "@/components/ModelsDialog";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();
  return (
    <Suspense>
      <Gemini>
        <main className="flex min-h-screen w-full flex-col lg:flex-row">
          <Sidebar userId={userId} />
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center">
              <div className="mt-3 mb-[10px] ml-[10px]">
                <ModelsDialog />
              </div>
              <UserButton />
            </div>
            {children}
          </div>
        </main>
      </Gemini>
    </Suspense>
  );
};

export default Layout;
