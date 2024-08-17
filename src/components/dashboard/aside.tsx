"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import AsideIcons from "@/components/dashboard/asideIcons";

import { cn } from "@/lib/utils";
import { config } from "@/config";

import { AsideMenuType } from "@/types";

const Aside = ({
  items,
  linkPrefix,
  translate,
}: {
  items: AsideMenuType[];
  linkPrefix?: boolean;
  translate?: string;
}) => {
  const pathName = usePathname();
  return (
    <aside
      className={cn(
        "flex flex-col w-64 h-[calc(100vh-50px)]",
        "bg-white dark:bg-navy-800 drop-shadow-sm",
        translate ? translate : "md:translate-x-0",
        "transition-all duration-150 ease-linear -translate-x-96",
        "fixed z-50",
        "rounded-tl-2xl rounded-bl-2xl"
      )}
    >
      <section className="px-14 py-8">
        <Link href="/">
          <h1 className="text-center text-2xl font-semibold uppercase text-cloudBurst dark:text-white">
            {config.COMAPNY_NAME}
          </h1>
        </Link>
      </section>
      <hr className="bg-gray-400" />
      <ul className="flex flex-col py-8 px-8 gap-y-8">
        {items.map(({ title, icon, link }, index) => {
          const isActive =
            pathName === link || pathName?.includes(link) ? true : false;
          return (
            <Link href={linkPrefix ? `${pathName}${link}` : link} key={index}>
              <li
                className={cn(
                  isActive
                    ? "after:content-[''] after:w-1 after:h-8 after:right-0 after:bg-brandLinear after:rounded-l-md after:absolute"
                    : "",
                  `flex items-center justify-start gap-x-4 group`
                )}
              >
                <AsideIcons icon={icon} />
                <span className="text-rockBlue font-normal text-lg group-hover:text-gray-950 dark:group-hover:text-white">
                  {title}
                </span>
              </li>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default Aside;
