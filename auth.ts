import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  providers: [Github, Google],
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
});
