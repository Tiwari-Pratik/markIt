/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Ap15U964IKx
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface Props {
  error?: string;
}

export default function LoginError(props: Props) {
  const error = props.error;
  return (
    <div
      key="1"
      className="flex flex-col min-h-screen items-center justify-center space-y-4 px-4"
    >
      <div className="w-full max-w-sm space-y-4">
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader className="space-y-2">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-bold">Authentication Error</div>
              <div className="text-sm text-red-500 dark:text-red-500 flex gap-2 items-center">
                <ExclamationTriangleIcon className="text-red-500 w-4 h-4" />
                {error}
              </div>
              <div>
                {error === "OAuthAccountNotLinked" && (
                  <p className="text-sm text-primary dark:text-primary">
                    Email already linked with a different OAuth provider
                  </p>
                )}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                You encountered an authentication error. Please check your
                credentials and try again.
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button className="w-full">
              <Link href="/login">Go back to login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
