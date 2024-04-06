import SigninLabel from "@/components/signup/signin_label";
import SignupForm from "@/components/signup/signup_form";

export default function Signup() {
  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      <div className="flex items-center m-2 col-span-1 justify-center">
        <div className="w-[60%]">
          <SignupForm />
          <SigninLabel />
        </div>
      </div>
      <div className="col-span-1 bg-primary hidden md:flex md:flex-col md:items-center md:justify-center p-4">
        <img src="/signup_man.png" className="w-80 mb-4" />
        <h1 className="text-2xl text-white font-bold">Achieve your goals</h1>
        <p className="text-white">Stay focused on your journey.</p>
      </div>
    </div>
  );
}
