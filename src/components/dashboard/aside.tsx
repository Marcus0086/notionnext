"use client";

import { useState } from "react";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import AsideIcons from "@/components/dashboard/asideIcons";

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
  const [close, setClose] = useState(false);
  const handleClose = () => setClose(!close);
  const pathName = usePathname();
  return (
    <aside
      className={cn(
        "flex flex-col min-h-full ",
        "bg-white dark:bg-navy-800 drop-shadow-sm",
        translate ? translate : "xl:translate-x-0",
        "transition-all duration-150 ease-linear -translate-x-96",
        "fixed z-50 "
      )}
    >
      <section className="px-14 py-8 relative">
        <button className="absolute top-2 right-2" onClick={handleClose}>
          <MdKeyboardArrowLeft className="w-6 h-6" />
        </button>
        <Link href="/">
          <h1 className="text-center text-2xl font-semibold uppercase text-cloudBurst dark:text-white">
            NotionSite.io
          </h1>
        </Link>
      </section>
      <hr className="bg-gray-400" />
      <ul className="flex flex-col py-8 px-8 gap-y-4">
        {items.map(({ title, icon, isDefault, link }, index) => (
          <Link href={linkPrefix ? `${pathName}${link}` : link} key={index}>
            <li className={`flex items-center justify-start gap-x-2 group`}>
              <AsideIcons icon={icon} />
              <span className="text-rockBlue font-normal text-sm group-hover:text-gray-950">
                {title}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
