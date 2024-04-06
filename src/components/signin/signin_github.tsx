"use client";

import { Github } from "lucide-react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export function GithubSignin() {
  return (
    <Button
      variant={"outline"}
      className="w-full"
      onClick={() => signIn("github")}
    >
      <Github /> Signin with Github
    </Button>
  );
}
