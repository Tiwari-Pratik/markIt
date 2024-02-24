"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import styles from "./verification.module.css";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { newEmailVerfication } from "@/lib/actions";

const VerificationEmailForm = () => {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  // const onSubmit = useCallback(() => {
  //   console.log(token);
  // }, [token]);

  useEffect(() => {
    const onSubmit = async () => {
      if (!token) {
        setMessage("Missing token!");
        setSuccess(false);
        return;
      }
      const newVerificationActionWithToken = newEmailVerfication.bind(
        null,
        token,
      );

      try {
        const result = await newVerificationActionWithToken();
        setSuccess(result.success);
        setMessage(result.message);
      } catch (error) {
        throw new Error("Something went wrong");
      }
    };
    onSubmit();
  }, [token, setSuccess, setMessage]);
  return (
    <div className="flex items-center min-h-screen justify-center">
      <div className="flex items-center justify-center flex-col w-[320px] h-[300px] border border-gray-200 rounded-lg shadow-sm bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Verifying your email
          </p>
        </div>
        <div className="p-2">
          {!success && !message && (
            <div className={styles.ldsellipsis}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </div>

        <div className="p-2">{message && <p>{message}</p>}</div>
        <div className="p-4">
          <Button disabled={!success}>
            <Link href="/login">Back to Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationEmailForm;
