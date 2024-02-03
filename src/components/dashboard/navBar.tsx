"use client";

import { usePathname } from "next/navigation";

import ThemeButton from "../shared/themeButton";
import BreadCrumbs from "@/components/dashboard/breadCrumbs";
import UserButton from "@/components/dashboard/userButton";

const NavBar = () => {
  const pathname = usePathname() || "/";

  return (
    <nav
      className="flex items-center flex-wrap justify-between w-full sticky top-4 z-40 p-2 rounded-xl
        bg-[rgba(255_,255_,255_,0.10)] dark:bg-blueZodiac backdrop-blur-xl"
    >
      <div className="flex flex-col gap-y-4 items-start justify-center">
        <BreadCrumbs path={pathname} />
        <h3 className="text-cloudBurst dark:text-white text-4xl capitalize font-medium">
          {pathname.replace("/", "")}
        </h3>
      </div>
      <div className="flex items-center justify-center">
        <UserButton />
        <ThemeButton />
      </div>
    </nav>
  );
};

export default NavBar;
