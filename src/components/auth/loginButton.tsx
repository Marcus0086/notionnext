"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { RiLoader4Line } from "react-icons/ri";

import { cn } from "@/lib/utils";

const LoginButton = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (provider: string) => {
    setIsLoading(true);
    await signIn(provider);
  };
  return (
    <button
      onClick={() => handleSignIn("github")}
      className={cn(
        "mt-9 bg-selago dark:bg-deepBlue rounded-xl w-full flex items-center justify-center gap-x-2 px-24 md:px-32 py-4",
        "transition duration-150 ease-in",
        isLoading ? "opacity-50 cursor-not-allowed" : "",
      )}
    >
      {!isLoading ? (
        children
      ) : (
        <RiLoader4Line className="animate-spin w-5 h-5" />
      )}
      <h3 className="text-cloudBurst dark:text-white text-xs">{title}</h3>
    </button>
  );
};

export default LoginButton;
