import GoogleSignin from "@/components/signin/signin_google";
import { GithubSignin } from "@/components/signin/signin_github";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CredentialsSignin from "@/components/signin/signin_form";

export default async function SignIn() {
  const session = await getServerSession();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      <div className="col-span-1 bg-primary hidden md:flex md:flex-col md:items-center md:justify-center p-4">
        <img src="/signin_man.png" className="w-66 mb-4" />
        <h1 className="text-2xl text-white mb-2 font-bold">
          Track Your Habbits
        </h1>
        <p className="text-white">Stay focused on your journey.</p>
      </div>
      <div className="flex items-center m-2 col-span-1 justify-center">
        <div className="w-[60%] h-1/2">
          <CredentialsSignin />
          <GoogleSignin />
          <GithubSignin />
        </div>
      </div>
    </div>
  );
}
