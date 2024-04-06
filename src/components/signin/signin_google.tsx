"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { AiOutlineGoogle } from "react-icons/ai";

const GoogleSignin = () => {
  return (
    <Button
      variant={"outline"}
      onClick={() => signIn("google")}
      className="w-full mb-3"
    >
      <AiOutlineGoogle size={25} /> Signin with Google
    </Button>
  );
};

export default GoogleSignin;
