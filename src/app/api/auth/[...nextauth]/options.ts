import type { NextAuthOptions, User as NextAuthUser } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectDB } from "@/db/connect";
import User from "@/db/user-model";
import mongoose from "mongoose";

interface User extends NextAuthUser {
  id: string;
}

interface JWTWithUser extends JWT {
  user?: User;
}

export const credentials = {
  usernameOrEmail: {
    label: "Username or Email:",
    type: "text",
    placeholder: "JohnDoe",
  },
  password: {
    label: "Password:",
    type: "password",
    placeholder: "********",
  },
};

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: credentials,
      async authorize(credentials) {
        await ConnectDB();
        if (!credentials?.usernameOrEmail)
          throw new Error("No username or email given!");
        if (!credentials?.password) throw new Error("No password given!");
        let user;
        if (credentials?.usernameOrEmail?.includes("@")) {
          user = await User.findOne({
            email: credentials?.usernameOrEmail,
          });
          if (!user) throw new Error("No user with that email found!");
        } else {
          user = await User.findOne({
            username: credentials?.usernameOrEmail,
          });
          if (!user) throw new Error("No user with that username found!");
        }
        if (
          user.password.includes("%github%") ||
          user.password.includes("%google%")
        ) {
          throw new Error(
            "Trying to log into an email thats already being used by google/github signin!"
          );
        } else if (user.password === credentials?.password) {
          return {
            id: user.id,
            name: user.username,
            email: user.email,
          };
        } else throw new Error("Password Incorrect!");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWTWithUser; user: User }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWTWithUser }) {
      if (token?.id && session?.user) session.user.id = token.id;
      return session;
    },
    async signIn({ user, account, profile }) {
      await ConnectDB();
      const isUserPresent = await User.findOne({ email: user.email });
      if (!isUserPresent) {
        const newUser = new User({
          id: user.id,
          username: user.name,
          email: user.email,
          password: `%${account?.provider}%`,
          image: user.image,
        });
        const result = await newUser.save();
      } else {
        if (
          !isUserPresent.password.includes(account?.provider) &&
          account?.provider !== "credentials"
        ) {
          isUserPresent.password = `${isUserPresent.password}%${account?.provider}%`;
          await isUserPresent.save();
        }
        if (!isUserPresent.image) {
          isUserPresent.image = user.image;
          await isUserPresent.save();
          user.id = isUserPresent.id;
        } else {
          user.id = isUserPresent.id;
          user.image = isUserPresent.image;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
