import Gemini from "@/components/Gemini";
import ModelsDialog from "@/components/ModelsDialog";
import Sidebar from "@/components/Sidebar";
import SignIn from "@/components/SignIn";
import { getUserByClerkID } from "@/lib/actions/user.actions";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
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
    };
  }

  return (
    <Gemini currentUser={user}>
      <main className="flex min-h-screen flex-row">
        <Sidebar userId={userId} />
        <div className="relative flex flex-1 flex-col">
          <div className="flex items-start justify-between">
            <div className="mt-2 ml-2">
              <ModelsDialog />
            </div>
            <div className="flex items-center">
              <SignedOut>
                <a
                  className="mr-[22px] text-[14px] leading-5 font-medium text-[#575b5f]"
                  href="https://gemini.google/about/"
                  target="_blank"
                >
                  About Gemini
                </a>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/sign-in"
                  className="mt-3 mr-5 flex h-9 items-center justify-center gap-2 self-start rounded-[8px] bg-[#dde3ea] px-6 text-xs font-medium text-[#1b1c1d]"
                >
                  <img
                    width={16}
                    height={16}
                    src="https://www.gstatic.com/lamda/images/gemini_sparkle_red_4ed1cbfcbc6c9e84c31b987da73fc4168aec8445.svg"
                  ></img>
                  <span>Upgrade</span>
                </Link>
                <div className="my-5 mr-5">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: {
                          width: 32,
                          height: 32,
                        },
                      },
                    }}
                  />
                </div>
              </SignedIn>
              <SignedOut>
                <div className="my-5 mr-5">
                  <SignIn className="inline-block min-w-24 rounded border-1 border-transparent bg-[#1a73e8] py-[9px] text-center text-sm leading-4 font-medium text-white hover:bg-[#1b66c9]" />
                </div>
              </SignedOut>
            </div>
          </div>
          {children}
        </div>
      </main>
    </Gemini>
  );
};

export default Layout;
