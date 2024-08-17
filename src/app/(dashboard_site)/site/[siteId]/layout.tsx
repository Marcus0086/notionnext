import dynamic from "next/dynamic";

import Title from "@/components/dashboard/title";
const SlotSites = dynamic(() => import("@/components/dashboard/slotSites"));

import ParentPageSettingsProvider from "@/context/parentPage";

import { cn } from "@/lib/utils";

const SiteSettingsPageLayout = ({
  children,
  aside,
  saveReset,
}: {
  children: React.ReactNode;
  aside: React.ReactNode;
  saveReset: React.ReactNode;
}) => {
  return (
    <>
      {aside}
      <ParentPageSettingsProvider>
        <section
          className={cn(
            "relative w-full h-full",
            "bg-lightPrimary dark:bg-navy-900 backdrop-blur-[1px] backdrop-filter",
            "dark:backdrop-blur-[1px dark:backdrop-filter bg-opacity-30 dark:bg-opacity-30",
            "flex items-start justify-start",
            "gap-x-8 p-4 sm:pl-16 rounded-2xl",
            "border-2 border-lightPrimary dark:border-navy-900"
          )}
        >
          <section className="w-full h-full llg:w-1/4 ml-0 sm:ml-10 transition-all duration-150 ease-in-out">
            <main className="flex flex-col justify-between w-full h-full gap-y-4">
              <h3 className="bg-white dark:bg-navy-800 p-4 rounded-xl text-3xl font-bold text-cloudBurst dark:text-selago flex items-center justify-between">
                <Title>{saveReset}</Title>
              </h3>
              <ul className="flex flex-col justify-start w-full h-full gap-y-5 overflow-x-hidden py-2 no-scroll">
                {children}
              </ul>
            </main>
          </section>
          <SlotSites />
        </section>
      </ParentPageSettingsProvider>
    </>
  );
};

export default SiteSettingsPageLayout;
