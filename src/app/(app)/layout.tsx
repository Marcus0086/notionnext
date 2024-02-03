import NextTopLoader from "nextjs-toploader";

import Aside from "@/components/dashboard/aside";
import NavBar from "@/components/dashboard/navBar";
import AuthContext from "@/components/authContext";
import { ASIDE_MENU } from "@/components/dashboard/constants";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextTopLoader showSpinner={false} />
      <AuthContext>
        <section className="flex h-full w-full">
          <Aside items={ASIDE_MENU} />
          <section className="w-full h-full bg-lightPrimary dark:bg-navy-900">
            <section className="mx-3 flex-none h-full transition-all md:pr-2 xl:ml-80">
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
