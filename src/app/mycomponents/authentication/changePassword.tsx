/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CTmcdf07JN4
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
import { ChangePasswordState } from "@/lib/schema";
import { useFormState } from "react-dom";
import { changePassword, registerUser } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ChangePasswordForm() {
  const initialState: ChangePasswordState = {
    message: null,
    errors: {},
    success: undefined,
  };
  const searchParam = useSearchParams();
  const token = searchParam.get("token") || " ";
  const changePasswordWithToken = changePassword.bind(null, token);
  const [state, dispatch] = useFormState(changePasswordWithToken, initialState);
  return (
    <div
      key="1"
      className="flex flex-col min-h-screen items-center justify-center space-y-4 px-4"
    >
      <div className="w-full max-w-sm space-y-4">
        <Card className="mx-auto w-[400px]">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl">Change Password</CardTitle>
            <CardDescription>Enter your new password below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form aria-describedby="custom-error-message" action={dispatch}>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  required
                  type="password"
                  name="password"
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
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  required
                  type="password"
                  name="confirmPassword"
                  aria-describedby="confirmPassword-error"
                />
              </div>
              <div
                id="confirmPassword-error"
                aria-live="polite"
                aria-atomic="true"
              >
                {state.errors?.confirmPassword &&
                  state.errors?.confirmPassword?.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
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
              <div className="mt-4 text-center text-sm">
                <Button className="w-full" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            {state.success && (
              <Button variant="link" size="sm">
                <Link href="/login">Back to Login</Link>{" "}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
