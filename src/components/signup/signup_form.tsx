"use client";

import signupSchema from "@/zod/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MailOpen } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit({
    username,
    email,
    password,
  }: z.infer<typeof signupSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const responseJson = await response.json();
      if (!response.ok) {
        throw new Error(responseJson.error);
      } else {
        const result = await signIn("credentials", {
          redirect: false,
          usernameOrEmail: username,
          password: password,
        });
        if (result?.error) {
          console.error(result.error);
          throw new Error(result.error);
        } else if (result?.ok) {
          setErrorMessage("");
          console.log(result);
          setSuccessMessage(responseJson.message);
          router.push("/dashboard");
        } else {
          console.log(result);
          throw new Error("Probably some error occured");
        }
      }
    } catch (error: any) {
      console.log(error.toString());
      setErrorMessage(error.toString());
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-3"
        aria-disabled={isLoading}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username:</FormLabel>
              <FormControl>
                <Input placeholder="JohnDoe" type="text" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input placeholder="john@doe.com" type="email" {...field} />
              </FormControl>
              <FormDescription>
                This is your email for authentication.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormDescription>This is your secure password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && (
          <p className="text-center font-semibold text-red-500 mb-3">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="text-center font-semibold text-green-500 mb-3">
            {successMessage}
          </p>
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          aria-disabled={isLoading}
        >
          <MailOpen className="mr-2 h-4 w-4" />
          Signup with Credentials
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
