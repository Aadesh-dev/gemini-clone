import Gemini from "@/components/Gemini";
import ModelsDialog from "@/components/ModelsDialog";
import Sidebar from "@/components/Sidebar";
import SignIn from "@/components/SignIn";
import { getUserByClerkID } from "@/lib/actions/user.actions";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const { userId } = await auth();
  let user;

  if (userId) {
    user = await getUserByClerkID(userId);
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
              <div className="my-4 mr-8">
                <SignedIn>
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
                </SignedIn>
                <SignedOut>
                  <SignIn className="inline-block rounded-full bg-[#0b57d0] px-6 py-[10px] text-center text-sm font-medium text-white hover:bg-blue-700" />
                </SignedOut>
              </div>
            </div>
          </div>
          {children}
        </div>
      </main>
    </Gemini>
  );
};

export default Layout;
