"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import AsideIcons from "./asideIcons";

import { cn } from "@/lib/utils";

import { Icons } from "@/types";

const AisdeButtons = ({
  siteId,
  link,
  icon,
  title,
}: {
  siteId: string;
  link: string;
  icon: Icons;
  title: string;
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  let href = `/site/${siteId || ""}${link}`;
  if (searchParams?.get("pageId")) {
    href += `?pageId=${searchParams.get("pageId")}`;
  }
  const fullPathName = `${pathName}${
    searchParams?.toString() ? `?${searchParams.toString()}` : ""
  }`;
  return (
    <Link href={href}>
      <li
        className={cn(
          "flex flex-col gap-y-2 items-center justify-center relative",
          "w-20 h-20 rounded-lg",
          "hover:bg-blueZodiac/20 dark:hover:bg-navy-900 transition duration-150 ease-in",
          fullPathName === href
            ? "after:content-[''] after:w-1 after:h-8 after:right-0 after:bg-brandLinear after:rounded-l-md after:absolute"
            : "",
        )}
      >
        <AsideIcons icon={icon} label={title} />
        <h3 className="text-xs">{title}</h3>
      </li>
    </Link>
  );
};

export default AisdeButtons;
