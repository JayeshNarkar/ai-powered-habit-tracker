"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignoutButton() {
  return (
    <Button
      onClick={() => signOut()}
      className=" w-full text-center"
      variant={"secondary"}
    >
      <LogOut size={32} className="p-1" /> <p className="p-2">SignOut</p>
    </Button>
  );
}
