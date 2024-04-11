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
  disableName,
}: {
  siteId: string;
  link: string;
  icon: Icons;
  title: string;
  disableName?: boolean;
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  let href = `/site/${siteId || ""}${link}`;
  if (searchParams?.get("pageId")) {
    href += `?pageId=${searchParams.get("pageId")}`;
  }
  if (searchParams?.get("kb")) {
    href += `?kb=${searchParams.get("kb")}`;
  }
  const fullPathName = `${pathName}${
    searchParams?.toString() ? `?${searchParams.toString()}` : ""
  }`;
  const hrefWithOutPage = href.split("?")[0];
  return (
    <Link href={hrefWithOutPage}>
      <li
        className={cn(
          "flex flex-col gap-y-2 items-center justify-center relative",
          "w-14 h-14 sm:w-20 sm:h-20 rounded-lg",
          "hover:bg-blueZodiac/20 dark:hover:bg-navy-900 transition duration-150 ease-in",
          fullPathName === href
            ? "after:content-[''] sm:after:w-1 sm:after:h-8 after:w-full after:h-1 after:bottom-0 sm:after:bottom-auto sm:after:right-0 after:bg-brandLinear sm:after:!rounded-l-md after:rounded-b-md sm:after:rounded-b-none after:absolute"
            : "",
        )}
      >
        <AsideIcons icon={icon} label={title} />
        {disableName ? null : <h3 className="text-xs">{title}</h3>}
      </li>
    </Link>
  );
};

export default AisdeButtons;
