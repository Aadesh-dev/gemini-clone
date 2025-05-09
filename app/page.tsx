"use client";

import { generateRandomID } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();
  
  const guestSignIn = () => {
    const userID = generateRandomID();
    router.push(`/app?guest=true&userID=${userID}`);
  };

  return (
    <>
      <SignedOut>
        <button className="button bg-purple-gradient bg-cover">
          <Link href="/sign-in">Sign in</Link>
        </button>
        <button
          className="button bg-purple-gradient bg-cover"
          onClick={guestSignIn}
        >
          Guest Sign in
        </button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default LandingPage;
