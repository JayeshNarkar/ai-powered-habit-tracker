"use client";

import SignoutButton from "../signout/signout_button";
import { BellIcon, MessageCircleIcon, PieChart } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Session } from "next-auth";
import { Badge } from "../ui/badge";

type User = Session["user"] & {
  id?: string;
};

export default function SideBar({
  user,
  badges,
}: {
  user: User | undefined;
  badges:
    | {
        github: boolean;
        google: boolean;
        password: boolean;
      }
    | undefined;
}) {
  const pathname = usePathname();

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
            <div>
              <h1 className="md:pl-2 font-normal text-md lg:text-lg text-center hidden md:block truncate">
                {user?.name}
              </h1>
              <div className="hidden md:flex content-start justify-start gap-1 ml-2 flex-wrap">
                {badges?.github && (
                  <Badge className="text-black bg-white">Github</Badge>
                )}
                {badges?.google && (
                  <Badge className="bg-white">
                    <span className="text-blue-500">G</span>
                    <span className="text-red-500">o</span>
                    <span className="text-yellow-500">o</span>
                    <span className="text-blue-500">g</span>
                    <span className="text-green-500">l</span>
                    <span className="text-red-500">e</span>
                  </Badge>
                )}
                {badges?.password && <Badge>Credentials</Badge>}
              </div>
            </div>
          </div>
        </Link>
        <Link
          className={`border-gray-400 border-y-2 flex content-center justify-center lg:content-start lg:justify-start items-center ${
            pathname.startsWith("/dashboard") ? "bg-red-500" : ""
          }`}
          href="/dashboard"
        >
          <PieChart className="w-6 h-6 m-3 lg:m-0 lg:ml-2" />
          <h1 className="p-3 text-left font-semibold hidden md:block overflow-hidden truncate">
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
          <h1 className="p-3 text-left font-semibold hidden md:block overflow-hidden truncate">
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
          <h1 className="p-3 text-left font-semibold hidden md:block overflow-hidden truncate">
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
