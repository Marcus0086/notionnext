"use client";

import Link from "next/link";
import { PiWarningCircleDuotone } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { domainSuffix, httpPrefix } from "@/lib/config";

const UpgardeButton = () => {
  return (
    <Button
      className="border-orange-200 flex items-center justify-center gap-1"
      variant={"outline"}
    >
      <PiWarningCircleDuotone className="w-4 h-4" />
      <Link
        href={`${httpPrefix}${domainSuffix}/pricing`}
        rel="noopener noreferrer"
        target="_blank"
      >
        Upgrade Now
      </Link>
    </Button>
  );
};

export default UpgardeButton;
