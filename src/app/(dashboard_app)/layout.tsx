import NextTopLoader from "nextjs-toploader";

import Aside from "@/components/dashboard/aside";
import NavBar from "@/components/dashboard/navBar";
import AuthContext from "@/components/authContext";
import { ASIDE_MENU } from "@/components/dashboard/constants";

import { cn } from "@/lib/utils";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextTopLoader showSpinner={false} />
      <AuthContext>
        <section className="flex w-full h-full p-2 md:p-6">
          <Aside items={ASIDE_MENU} />
          <section
            className={cn(
              "w-full h-full",
              "rounded-2xl border-2 border-lightPrimary dark:border-navy-900",
              "bg-lightPrimary dark:bg-navy-900",
              "backdrop-blur-[1px] backdrop-filter dark:backdrop-blur-[1px] dark:backdrop-filter bg-opacity-30 dark:bg-opacity-30"
            )}
          >
            <section className="mx-3 flex-none h-full transition-all md:pr-2 md:ml-72">
              <section className="h-full overflow-auto no-scroll">
                <NavBar />
                {children}
              </section>
            </section>
          </section>
        </section>
      </AuthContext>
    </>
  );
};
export default DashboardLayout;
