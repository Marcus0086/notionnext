import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { domainSuffix, httpPrefix } from "@/lib/config";

type Props = {};

const TryNowButton = (props: Props) => {
  return (
    <Link href={`${httpPrefix}app.${domainSuffix}`} target="_blank">
      <Button
        size={"lg"}
        className={cn(
          "flex items-center justify-center",
          "md:p-8 p-6 mb-8 md:mb-0 text-xl md:text-2xl gap-4",
          "w-fit",
          "border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white",
          "group transition-all hover:shadow-xl hover:shadow-neutral-500 duration-500"
        )}
      >
        <span
          className={cn(
            "bg-clip-text text-transparent",
            "bg-gradient-to-r from-neutral-500  to-neutral-600",
            "md:text-center font-sans",
            "group-hover:bg-gradient-to-r group-hover::from-black group-hover:to-black"
          )}
        >
          Try Now
        </span>
      </Button>
    </Link>
  );
};

export default TryNowButton;
