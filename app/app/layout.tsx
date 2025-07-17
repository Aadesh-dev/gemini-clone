import Gemini from "@/components/Gemini";
import Header from "@/components/Header";
import SidebarContainer from "@/components/sidebar/SidebarContainer";
import { getUserByClerkID } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const { userId } = await auth();
  let user;

  if (userId) {
    user = await getUserByClerkID(userId);
  } else {
    // Only purpose to set this user object is for positioning of the models dialog with respect to the sidebar.
    user = {
      _id: "",
      clerkID: "",
      email: "",
      firstName: "",
      lastName: "",
      sidebarExpanded: false,
      showIntroMessage: false,
    };
  }

  return (
    <Gemini currentUser={user}>
      <main className="flex min-h-screen flex-row">
        <SidebarContainer userId={userId} />
        <div className="relative flex flex-1 flex-col bg-white">
          <Header />
          {children}
        </div>
      </main>
    </Gemini>
  );
};

export default Layout;
