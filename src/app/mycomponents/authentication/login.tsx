/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XmAx6TDcqWY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginState } from "@/lib/schema";
import { useFormState } from "react-dom";
import { githubLogin, googleLogin, loginUser } from "@/lib/actions";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SubmitButton from "./submitButton";

export default function Login() {
  const initialState: LoginState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(loginUser, initialState);

  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const router = useRouter();

  if (urlError) {
    router.replace(`/login-error?error=${urlError}`);
  }

  const githubClickHandler = async () => {
    await githubLogin();
  };

  const googleClickHandler = async () => {
    await googleLogin();
  };

  return (
    <div
      key="1"
      className="flex flex-col min-h-screen items-center justify-center space-y-4 px-4"
    >
      <div className="w-full max-w-sm space-y-4">
        <Card key="1">
          <CardHeader className="space-y-2">
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
            <div className="flex justify-start gap-4 mt-2">
              <Button
                className="w-12 h-12 rounded-full bg-[#24292e] flex items-center justify-center"
                onClick={githubClickHandler}
              >
                <GithubIcon className="text-white" />
              </Button>
              <Button
                className="w-12 h-12 rounded-full bg-[#ea4335] flex items-center justify-center"
                onClick={googleClickHandler}
              >
                <ChromeIcon className="text-white" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <form aria-describedby="custom-error-message" action={dispatch}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                  aria-describedby="email-error"
                />
              </div>
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.email &&
                  state.errors?.email?.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  required
                  type="password"
                  placeholder="********"
                  aria-describedby="password-error"
                />
              </div>
              <div id="password-error" aria-live="polite" aria-atomic="true">
                {state.errors?.password &&
                  state.errors?.password?.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
              <Button variant="link" size="sm">
                <Link href="/reset-password">Forgot password?</Link>{" "}
              </Button>
              <div
                id="custom-error-message"
                aria-live="polite"
                aria-atomic="true"
              >
                {state.message && (
                  <p className="mt-2 text-sm text-red-500">{state.message}</p>
                )}
              </div>
              <CardFooter className="mt-8 flex gap-2">
                {/*               <Button type="submit" className="flex-1">
                  Sign in
                </Button>
                */}
                <SubmitButton />
              </CardFooter>
            </form>

            <CardFooter>
              <p className="text-sm">
                Don't have an account. Register{" "}
                <span>
                  <Link
                    href="/register"
                    className="ml-2 px-4 py-2 bg-primary text-sm text-white rounded-md"
                  >
                    Here
                  </Link>
                </span>
              </p>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function GithubIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
