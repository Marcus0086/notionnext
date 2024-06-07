import React, { Suspense } from "react";

import CreateSiteForm from "@/components/dashboard/form";
import Tabs from "@/components/dashboard/tabs";
import LoadingCard from "@/components/dashboard/loadingCard";
import RecentHistory from "@/components/dashboard/recentHistory";
import { BackgroundBeams } from "@/components/ui/backgroundBeams";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex xl:flex-row flex-col items-start justify-between w-full gap-4">
      <section className="pt-5 w-full xl:max-w-[55rem]">
        <div className="rounded-3xl bg-white dark:bg-navy-800 drop-shadow-xl">
          <BackgroundBeams />
          <CreateSiteForm />
        </div>
        <section className="w-full mt-5">
          <nav className="flex items-center justify-between font-normal">
            <h3 className="text-cloudBurst dark:text-white text-2xl">Sites</h3>
            <Suspense fallback={<LoadingCard />}>
              <Tabs />
            </Suspense>
          </nav>
          {children}
        </section>
      </section>

      <section className="relative pt-5 xl:max-w-[28rem] w-full">
        <RecentHistory />
      </section>
    </section>
  );
};

export default HomeLayout;
