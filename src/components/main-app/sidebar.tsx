"use client";
import { useSession } from "next-auth/react";
import SignoutButton from "../signout/signout_button";
import { BellIcon, MessageCircleIcon, PieChart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export interface User {
  name?: string | null;
  email?: string | null;
  id?: string | null;
  image?: string | null;
}

type UserOrUndefined = User | undefined;

export default function SideBar() {
  const pathname = usePathname();

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
    <div
      className="bg-gray-200 flex flex-col justify-between flex-grow rounded-md"
      style={{ fontFamily: "Fira Code" }}
    >
      <div>
        <Link href={"/social/" + user?.id}>
          <div className="flex justify-center lg:justify-start content-between items-center m-3">
            <img
              src={user?.image || "/default_pfp.jpg"}
              className="rounded-full w-16"
            />
            <h1 className="md:pl-2 font-normal text-md lg:text-lg text-center hidden md:block overflow-hidden truncate">
              {user?.name}
            </h1>
          </div>
        </Link>
        <Link
          className={`border-gray-400 border-y-2 flex content-center justify-center lg:content-start lg:justify-start items-center ${
            pathname.startsWith("/dashboard") ? "bg-red-500" : ""
          }`}
          href="/dashboard"
        >
          <PieChart className="w-6 h-6 m-3 lg:m-0 lg:ml-2" />
          <h1 className="p-3 text-left font-semibold hidden md:block">
            DashBoard
          </h1>
        </Link>
        <Link
          href={"/social"}
          className={`border-gray-400 border-b-2 flex content-center justify-center lg:content-start lg:justify-start items-center ${
            pathname.startsWith("/social") ? "bg-red-500" : ""
          }`}
        >
          <MessageCircleIcon className="w-6 h-6 m-3 lg:m-0 lg:ml-2" />
          <h1 className="p-3 text-left font-semibold hidden md:block">
            Social
          </h1>
        </Link>
        <Link
          href={"/notifications"}
          className={`border-gray-400 border-b-2 flex content-center justify-center lg:content-start lg:justify-start items-center ${
            pathname.startsWith("/notifications") ? "bg-red-500" : ""
          }`}
        >
          <BellIcon className="w-6 h-6 m-3 lg:m-0 lg:ml-2" />
          <h1 className="p-3 text-left font-semibold hidden md:block">
            Notifications
          </h1>
        </Link>
      </div>
      <div className="flex justify-center content-center p-3">
        <SignoutButton />
      </div>
    </div>
  );
}
