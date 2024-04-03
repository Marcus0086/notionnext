"use client";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

const FormSubmitButton = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={cn(
        "bg-navy-600 dark:bg-white rounded-xl py-2 px-4 text-white dark:text-black text-base mt-5",
        pending ? "cursor-not-allowed animate-pulse" : ""
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default FormSubmitButton;
