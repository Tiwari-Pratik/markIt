"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import styles from "./verification.module.css";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const Verification = () => {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");

  const onSubmit = useCallback(() => {
    console.log(token);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div className="flex items-center min-h-screen justify-center">
      <div className="flex items-center justify-center flex-col w-[320px] border border-gray-200 rounded-lg shadow-sm bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Verifying your email
          </p>
        </div>
        <div className="p-6">
          <div className={styles.ldsellipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="p-6">
          <Button>
            <Link href="/login">Back to Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
