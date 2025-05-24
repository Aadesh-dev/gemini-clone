import Link from "next/link";
import React from "react";

const SignIn = ({ className }: { className: string }) => {
  return (
    <Link href="/sign-in" className={className}>
      <span>Sign in</span>
    </Link>
  );
};

export default SignIn;
