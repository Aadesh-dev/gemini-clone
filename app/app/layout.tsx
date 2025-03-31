import Sidebar from "@/components/Sidebar";
import Gemini from "@/components/Gemini";
import ModelsDialog from "@/components/ModelsDialog";
import { Suspense } from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <Gemini>
      <main className="flex min-h-screen w-full flex-col lg:flex-row">
        <Suspense>
          <Sidebar />
        </Suspense>
        <div className="mt-3 mb-[10px] ml-[10px]">
          <ModelsDialog />
        </div>
        {children}
      </main>
    </Gemini>
  );
};

export default Layout;
