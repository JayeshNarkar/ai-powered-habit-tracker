"use client";
import { useSession } from "next-auth/react";
import SignoutButton from "../signout/signout_button";

export interface User {
  name?: string | null;
  email?: string | null;
  id?: string | null;
  image?: string | null;
}

type UserOrUndefined = User | undefined;

export default function SideBar() {
  const { data: session, status } = useSession();
  let user: UserOrUndefined = {};
  if (status === "loading") {
    user.name = "Loading...";
    user.image = "/default_pfp.jpg";
  }
  if (status === "authenticated") {
    user = session.user;
  }

  return (
    <div className="bg-gray-200 flex flex-col justify-between flex-grow rounded-md">
      <div className="border-gray-400 border-b-2">
        <div className="flex justify-between content-between items-center m-3">
          <img
            src={user?.image || "/default_pfp.jpg"}
            className="w-14 h-14 rounded-full"
          />
          <h1 className="font-bold text-md lg:text-xl text-center hidden md:block">
            {user?.name}
          </h1>
        </div>
      </div>
      <div className="flex justify-center content-center p-3">
        <SignoutButton />
      </div>
    </div>
  );
}
