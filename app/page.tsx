import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <SignedOut>
        <button className="button bg-purple-gradient bg-cover">
          <Link href="/sign-in">Sign in</Link>
        </button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default LandingPage;
