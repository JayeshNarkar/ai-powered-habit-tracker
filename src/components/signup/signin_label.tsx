"use client";

import Link from "next/link";

const SigninLabel = () => {
  return (
    <p className="text-center font-semibold mb-3">
      Already have an account?{" "}
      <Link href="/signin" className="font-bold text-primary">
        SignIn
      </Link>
    </p>
  );
};

export default SigninLabel;
