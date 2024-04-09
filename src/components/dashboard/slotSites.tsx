"use client";

import SettingsNav from "@/components/dashboard/settingsNav";
import ClientNotionPage from "@/components/dashboard/clientNotionPage";
import LoadingComponent from "@/components/dashboard/loadingComponent";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";

import useSlotSite from "@/hooks/useSlotSite";

const SlotSites = () => {
  const { pageProps } = useSlotSite();

  return (
    <>
      {pageProps ? (
        <>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="block llg:hidden absolute right-8"
                variant="outline"
              >
                Preview
              </Button>
            </SheetTrigger>
            <SheetContent className="p-0 bg-lightPrimary dark:bg-navy-900 sm:max-w-full w-full h-full overflow-auto">
              <SheetHeader>
                <SheetClose />
              </SheetHeader>
              <hr className="w-full h-12" />
              <SettingsNav pageProps={pageProps} />
              <div className="flex items-center justify-center h-full overflow-auto no-scroll">
                <ClientNotionPage pageProps={pageProps} />
              </div>
            </SheetContent>
          </Sheet>
          <section
            className={cn(
              "hidden llg:block",
              "h-full transition-all duration-150 ease-in-out overflow-hidden sticky top-28",
              "min-w-[375px] xl:w-3/4",
              "rounded-md border border-gray-300 dark:border-gray-800"
            )}
          >
            <SettingsNav pageProps={pageProps} />
            <div className="flex items-center justify-center h-full overflow-auto no-scroll">
              <ClientNotionPage pageProps={pageProps} />
            </div>
          </section>
        </>
      ) : (
        <div className="hidden lg:block">
          <LoadingComponent />
        </div>
      )}
    </>
  );
};

export default SlotSites;
