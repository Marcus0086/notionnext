import Link from "next/link";
import { Suspense } from "react";

import ThemeButton from "../shared/themeButton";
import AisdeButtons from "@/components/dashboard/asideButtons";
import LoadingComponent from "@/components/dashboard/loadingComponent";
import UserButton from "@/components/dashboard/userButton";

import { cn } from "@/lib/utils";
import { config } from "@/config";

import { AsideMenuType } from "@/types";

const SettingsAside = ({
  items,
  siteId,
}: {
  items: AsideMenuType[];
  siteId?: string;
}) => {
  return (
    <>
      <aside className="flex items-center justify-center bg-white dark:bg-navy-800 sm:hidden shadow-2xl">
        <ul className="h-auto w-full overflow-auto flex items-center justify-start gap-x-2 no-scroll">
          {items.map(({ title, icon, link }, index) => (
            <AisdeButtons
              key={index}
              siteId={siteId || ""}
              link={link}
              icon={icon}
              title={title}
              disableName
            />
          ))}
          <UserButton />
        </ul>
        <div className="flex w-8">
          <ThemeButton />
        </div>
      </aside>
      <aside
        className={cn(
          "bg-white dark:bg-navy-800 drop-shadow-sm",
          "hidden sm:flex flex-col h-[calc(100vh-50px)]",
          "transition-all duration-150 ease-linear",
          "fixed z-50",
          "rounded-tl-2xl rounded-bl-2xl"
        )}
      >
        <section className="w-20 h-20 flex items-center justify-center">
          <Link href="/home">
            <h1 className="text-center text-2xl font-semibold uppercase text-cloudBurst dark:text-white italic">
              {config.COMAPNY_NAME_SHORT}
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
        <div className="flex flex-col items-center justify-center gap-y-4 py-4 mx-auto mt-auto">
          <UserButton />
          <ThemeButton />
        </div>
      </aside>
    </>
  );
};

export default SettingsAside;
