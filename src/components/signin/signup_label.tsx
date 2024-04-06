"use client";

import Link from "next/link";

export default () => {
  return (
    <p className="text-center font-semibold mb-3">
      Dont have an account?{" "}
      <Link className="font-bold text-primary" href="/signup">
        SignUp
      </Link>
    </p>
  );
};
