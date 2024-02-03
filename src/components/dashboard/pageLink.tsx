import React, { FC } from "react";
import Link from "next/link";

import { NextLinkProps } from "@/types";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const PageLink: FC<NextLinkProps> = ({ href, className, children }) => {
  const pathName = usePathname();

  const prependLink = (path: string | null, childLink: string) => {
    if (!path) return childLink;
    const regex = /\/site\/[a-zA-Z0-9]+(\/[a-z]*)?/g;
    const match = path.match(regex);
    if (match) {
      let sitePath = match[0];
      if (childLink.length > 1) {
        sitePath += `?pageId=${childLink.replace("/", "")}`;
      }
      return sitePath;
    }
    return childLink;
  };

  const link = prependLink(pathName, href);
  return (
    <Link href={link} passHref className={cn(className || "")}>
      {children}
    </Link>
  );
};

export default PageLink;
