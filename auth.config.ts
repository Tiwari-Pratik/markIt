import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  privateRoutes,
  publicRoutes,
} from "@/lib/myRoutes";
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
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
  },
} satisfies NextAuthConfig;
