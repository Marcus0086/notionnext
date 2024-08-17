import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Metadata } from "next";

const SiteCard = dynamic(() => import("@/components/dashboard/siteCard"));
import getSessionUser from "@/lib/getSessionUser";

import { VisibilityFilter } from "@prisma/client";
import { getUserSites } from "@/lib/actions/site";
import { authOptions } from "@/components/auth/constants";
import LoadingCard from "@/components/dashboard/loadingCard";

export const metadata: Metadata = {
  title: "Home | Dashboard",
  description: "Your sites are here!",
};

const DashboardHomePage = async ({
  searchParams: { filter = "draft" },
}: {
  searchParams: {
    filter: "live" | "draft" | "archived";
  };
}) => {
  const user = await getSessionUser();
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const userSites = await getUserSites(
    filter.toLocaleUpperCase() as VisibilityFilter,
    user.id
  );
  return (
    <main className="mt-4 pb-20">
      {userSites.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full items-center justify-center gap-4">
          <Suspense fallback={<LoadingCard />}>
            {userSites.map((site) => (
              <SiteCard {...site} key={site.id} />
            ))}
          </Suspense>
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center w-full font-medium text-center">
          <div className="flex items-center justify-center">
            <h1 className="text-9xl sm:text-[14rem] leading-tight">404</h1>
          </div>
          <h3 className="text-3xl">{"It's very quiet here!"}</h3>
        </div>
      )}
    </main>
  );
};

export default DashboardHomePage;
