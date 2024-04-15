import { Suspense } from "react";
import { notFound } from "next/navigation";

import { NAV_SETTINGS } from "@/components/dashboard/constants";
import LoadingCard from "@/components/dashboard/loadingCard";
import NameInputCard from "@/components/dashboard/nameInputCard";

import { getNavSiteCardById } from "@/lib/actions/site/get/nav";

import { SitePageParams } from "@/types/site";

const NavSettings = async ({ params: { siteId } }: SitePageParams) => {
  const navSiteCard = await getNavSiteCardById(siteId);
  if (!navSiteCard || !navSiteCard.siteConfig) {
    notFound();
  }
  return (
    <>
      {NAV_SETTINGS.map((card, index) => (
        <Suspense key={card.title} fallback={<LoadingCard />}>
          <NameInputCard
            key={index}
            {...card}
            {...navSiteCard}
            siteId={siteId}
            navigationStyle={
              navSiteCard.siteConfig?.navigationStyle || "default"
            }
            type={card.type}
          />
        </Suspense>
      ))}
    </>
  );
};

export default NavSettings;
