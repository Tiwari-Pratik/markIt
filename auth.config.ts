import { getUserById } from "@/lib/data";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  privateRoutes,
  publicRoutes,
} from "@/lib/myRoutes";
import type { NextAuthConfig, DefaultSession } from "next-auth";
import { NextResponse } from "next/server";
import "next-auth/jwt";
import "next-auth";
import { UserRole } from "@prisma/client";
import { db } from "@/lib/db";

type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};
declare module "next-auth" {
  interface Session {
    /** The user's postal address. */
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role?: UserRole;
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login-error",
  },
  providers: [],
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnEditor = nextUrl.pathname === "/";
      console.log("pathname: ", nextUrl.pathname);

      const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      const isAuthRoute = authRoutes.includes(nextUrl.pathname);
      const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);

      if (isAPIAuthRoute) {
        return true;
      }

      if (isAuthRoute) {
        if (isLoggedIn) {
          return NextResponse.redirect(
            new URL(DEFAULT_LOGIN_REDIRECT, nextUrl),
          );
        }
        return true;
      }

      if (isPublicRoute) {
        return true;
      }

      if (isPrivateRoute) {
        if (isLoggedIn) {
          return true;
        }
        // return NextResponse.redirect(new URL("/register", nextUrl));
        return false;
      }
    },

    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (!user.id) return false;
      const existingUser = await getUserById(user.id);
      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }
      return true;
    },

    async jwt({ token, account }) {
      // console.log({ token });
      // token.customField = "test";
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }
      console.log({ sessionToken: token, session });
      return session;
    },
  },
} satisfies NextAuthConfig;
