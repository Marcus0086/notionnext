import { Suspense } from "react";

import Title from "@/components/dashboard/title";
import SlotSites from "@/components/dashboard/slotSites";

import ParentPageSettingsProvider from "@/context/parentPage";

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
        <section className="relative w-full h-full bg-lightPrimary dark:bg-navy-900 flex items-start justify-start gap-x-8 p-4 sm:p-8 sm:pl-20">
          <section className="w-full h-full llg:w-1/4 ml-0 sm:ml-10 transition-all duration-150 ease-in-out">
            <main className="flex flex-col justify-between w-full h-full gap-y-4">
              <h3 className="text-3xl font-bold text-cloudBurst dark:text-selago">
                <Title />
              </h3>
              <ul className="flex flex-col justify-start w-full h-full gap-y-5 overflow-x-hidden py-2 no-scroll">
                {children}
              </ul>
              {saveReset}
            </main>
          </section>
          <Suspense>
            <SlotSites />
          </Suspense>
        </section>
      </ParentPageSettingsProvider>
    </>
  );
};

export default SiteSettingsPageLayout;
