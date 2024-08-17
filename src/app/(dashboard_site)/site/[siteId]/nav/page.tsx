import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { NAV_SETTINGS } from "@/components/dashboard/constants";
import LoadingCard from "@/components/dashboard/loadingCard";
import NameInputCard from "@/components/dashboard/nameInputCard";

import { getNavSiteCardById } from "@/lib/actions/site/get/nav";

import { SitePageParams } from "@/types/site";

export async function generateMetadata({
  params: { siteId },
}: SitePageParams): Promise<Metadata> {
  const navCard = await getNavSiteCardById(siteId);
  if (!navCard) {
    return {
      title: "Nav Settings",
      description: "Update your Nav settings.",
    };
  }
  return {
    title: `${navCard.name} | Nav Settings`,
    description: `Update your Nav settings for ${navCard.name}.`,
  };
}

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

export const dynamicParams = true;

export const generateStaticParams = async () => {
  return [];
};
