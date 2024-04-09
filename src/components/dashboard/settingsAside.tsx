"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import ThemeButton from "../shared/themeButton";
import AisdeButtons from "@/components/dashboard/asideButtons";
import LoadingComponent from "@/components/dashboard/loadingComponent";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { AsideMenuType } from "@/types";

const SettingsAside = ({
  items,
  siteId,
}: {
  items: AsideMenuType[];
  siteId?: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button
        className="sm:hidden absolute right-32 top-4 z-20 flex items-center justify-center"
        variant="outline"
        onClick={toggleMenu}
      >
        <HamburgerMenuIcon className="w-6 h-6" />
      </Button>

      <aside
        className={cn(
          "flex flex-col min-h-full",
          "bg-white dark:bg-navy-800 drop-shadow-sm",
          isOpen ? "block sm:block" : "hidden sm:block",
          "transition-all duration-150 ease-linear",
          "fixed z-50 "
        )}
      >
        <section className="w-20 h-20 flex items-center justify-center">
          <Link href="/home">
            <h1 className="text-center text-2xl font-semibold uppercase text-cloudBurst dark:text-white italic">
              NS
            </h1>
          </Link>
        </section>
        <hr className="bg-gray-400 w-full" />
        <Suspense fallback={<LoadingComponent />}>
          <ul className="flex flex-col">
            {items.map(({ title, icon, link }, index) => (
              <AisdeButtons
                key={index}
                siteId={siteId || ""}
                link={link}
                icon={icon}
                title={title}
              />
            ))}
          </ul>
        </Suspense>
        <div className="flex flex-col items-center justify-center py-4 mx-auto mt-auto">
          <ThemeButton />
        </div>
      </aside>
    </>
  );
};

export default SettingsAside;
