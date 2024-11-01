import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Metadata } from "next";

import LoadingCard from "@/components/dashboard/loadingCard";
import { GENERAL_SETTINGS } from "@/components/dashboard/constants";
const SiteCard = dynamic(() => import("@/components/dashboard/siteCard"));
const NameInputCard = dynamic(
  () => import("@/components/dashboard/nameInputCard"),
);

import { getGeneralSiteCardById } from "@/lib/actions/site";

import { SitePageParams } from "@/types";

export async function generateMetadata({
  params: { siteId },
}: SitePageParams): Promise<Metadata> {
  const siteCard = await getGeneralSiteCardById(siteId);
  if (!siteCard) {
    return {
      title: "Site Settings",
      description: "Update your site settings.",
    };
  }
  return {
    title: `${siteCard.name} | General Settings`,
    description: `Update your site settings for ${siteCard.name}.`,
  };
}

const SiteSettingsPage = async ({ params: { siteId } }: SitePageParams) => {
  const siteCard = await getGeneralSiteCardById(siteId);
  if (!siteCard) {
    notFound();
  }
  return (
    <>
      <Suspense fallback={<LoadingCard />}>
        <SiteCard {...siteCard} delete={false} settings={true} />
      </Suspense>
      <Suspense fallback={<LoadingCard />}>
        {GENERAL_SETTINGS.map((card) => (
          <NameInputCard
            {...card}
            {...siteCard}
            url={siteCard.siteConfig?.rootNotionPageId || ""}
            type={card.type}
            siteId={siteId}
            key={card.title}
            siteTitle={siteCard?.name}
          />
        ))}
      </Suspense>
    </>
  );
};
export default SiteSettingsPage;

export const dynamicParams = true;

export const generateStaticParams = async () => {
  return [];
};
