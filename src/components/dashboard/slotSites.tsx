"use client";

import SettingsNav from "@/components/dashboard/settingsNav";
import ClientNotionPage from "@/components/dashboard/clientNotionPage";

import useSlotSite from "@/hooks/useSlotSite";

const LoadingComponent = () => {
  return (
    <div className="w-full h-screen bg-gray-100 dark:bg-navy-900">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-64 h-16 bg-gray-300 dark:bg-gray-900 animate-pulse rounded-md" />
        <div className="mt-8 w-full max-w-md space-y-4">
          <div className="h-12 bg-gray-300 dark:bg-gray-900 animate-pulse rounded-md" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-40 bg-gray-300 dark:bg-gray-900 animate-pulse rounded-md" />
            <div className="h-40 bg-gray-300 dark:bg-gray-900 animate-pulse rounded-md" />
            <div className="h-40 bg-gray-300 dark:bg-gray-900 animate-pulse rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SlotSites = () => {
  const { pageProps } = useSlotSite();

  return (
    <>
      {pageProps ? (
        <>
          <SettingsNav pageProps={pageProps} />
          <div className="flex items-center justify-center h-full overflow-auto no-scroll">
            <ClientNotionPage pageProps={pageProps} />
          </div>
        </>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
};

export default SlotSites;
