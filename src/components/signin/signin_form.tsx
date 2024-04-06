"use client";

import { credentials } from "@/app/api/auth/[...nextauth]/options";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Signup_label from "./signup_label";

const CredentialsSignin = () => {
  const { usernameOrEmail, password } = credentials;
  const router = useRouter();

  const [usernameOrEmailValue, setUsernameOrEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      usernameOrEmail: usernameOrEmailValue,
      password: passwordValue,
    });
    if (result?.error) {
      console.error(result.error);
      setErrorMessage(result.error);
    } else if (result?.ok) {
      router.push("/dashboard");
    } else {
      setErrorMessage("Probably some error occured");
      console.log(result);
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="UsernameOrEmail">{usernameOrEmail.label}</Label>
      <Input
        type={usernameOrEmail.type}
        id="UsernameOrEmail"
        placeholder={usernameOrEmail.placeholder}
        value={usernameOrEmailValue}
        onChange={(e) => setUsernameOrEmailValue(e.target.value)}
        required
      />
      <Label htmlFor="password">{password.label}</Label>
      <Input
        type={password.type}
        id="password"
        placeholder={password.placeholder}
        className="mb-3"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        required
      />
      {errorMessage && (
        <p className="text-center font-semibold text-red-500 mb-3">
          {errorMessage}
        </p>
      )}
      <Button
        type="submit"
        className="w-full mb-3"
        disabled={isLoading}
        aria-disabled={isLoading}
      >
        <Mail className="mr-2 h-4 w-4" /> Login with Credentials
      </Button>
      <Signup_label />
    </form>
  );
};

export default CredentialsSignin;
