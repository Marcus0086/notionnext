import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const CreateSiteForm = dynamic(() => import("@/components/dashboard/form"));
import Tabs from "@/components/dashboard/tabs";
import LoadingCard from "@/components/dashboard/loadingCard";
import RecentHistory from "@/components/dashboard/recentHistory";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex lg:flex-row flex-col items-start justify-between w-full gap-4">
      <section className="pt-5 max-w-[55rem]">
        <div className="rounded-3xl bg-navy-900 dark:bg-navy-800 drop-shadow-xl">
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

      <section className="relative pt-5 lg:max-w-[28rem] w-full">
        <RecentHistory />
      </section>
    </section>
  );
};

export default HomeLayout;
