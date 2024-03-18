import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const SiteCard = dynamic(() => import("@/components/dashboard/siteCard"));
import getSessionUser from "@/lib/getSessionUser";

import { VisibilityFilter } from "@prisma/client";
import { getUserSites } from "@/lib/actions/site";
import { authOptions } from "@/components/auth/constants";
import Image from "next/image";

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
    user.id,
  );
  return (
    <main className="mt-4 pb-20">
      {userSites.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full items-center justify-center gap-4">
          {userSites.map((site) => (
            <SiteCard {...site} key={site.id} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center w-full font-medium text-center">
          <div className="flex items-center justify-center">
            <h1 className="text-[14rem] leading-none">4</h1>
            <Image
              src="/images/dashboard/notfound.webp"
              alt="Not Found"
              width={276}
              height={276}
              className="mix-blend-multiply"
            />
            <h1 className="text-[14rem] leading-none">4</h1>
          </div>
          <h3 className="text-3xl">{"It's very quiet here!"}</h3>
        </div>
      )}
    </main>
  );
};

export default DashboardHomePage;
