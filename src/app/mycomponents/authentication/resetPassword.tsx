/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rBxs4RhFDZY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ResetState } from "@/lib/schema";
import { useFormState } from "react-dom";
import { resetPassword } from "@/lib/actions";

export default function ResetPasswordForm() {
  const initialState: ResetState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(resetPassword, initialState);
  return (
    <div
      key="1"
      className="flex flex-col min-h-screen items-center justify-center space-y-4 px-4"
    >
      <div className="w-full max-w-sm space-y-4">
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              Enter your email below to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form aria-describedby="custom-error-message" action={dispatch}>
              <div className="space-y-4">
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
                <Button className="w-full" type="submit">
                  Send Reset Email
                </Button>
              </div>
              <div
                id="custom-error-message"
                aria-live="polite"
                aria-atomic="true"
              >
                {state.message && (
                  <p className="mt-2 text-sm text-red-500">{state.message}</p>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="mt-4 text-center text-sm">
              Remember your password?
              <span> </span>
              <Link className="underline text-primary" href="/login">
                Back to Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
