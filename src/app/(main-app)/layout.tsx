import SideBar from "@/components/main-app/sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
import User from "@/db/user-model";
import { Session } from "next-auth";
import { ConnectDB } from "@/db/connect";

type User = Session["user"] & {
  id?: string;
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  let badges;
  if (!session) {
    redirect("/login");
  } else {
    ConnectDB();
    console.log(session.user);
    const user = await User.findOne({ id: session.user?.id });
    badges = {
      github: user.password.includes("%github%"),
      google: user.password.includes("%google%"),
      password: !(
        user.password.includes("%google%") || user.password.includes("%github%")
      ),
    };
  }

  return (
    <div className="min-w-full min-h-screen grid grid-cols-10">
      <link
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&display=swap"
        rel="stylesheet"
      ></link>
      <div className="col-span-3 md:col-span-2 p-3 flex flex-col space-y-3">
        <SideBar user={session?.user} badges={badges} />
      </div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
      />
      <div
        className="col-span-7 md:col-span-8"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {children}
      </div>
    </div>
  );
}
