import { notFound } from "next/navigation";

import SiteCard from "@/components/dashboard/siteCard";
import { GENERAL_SETTINGS } from "@/components/dashboard/constants";
import NameInputCard from "@/components/dashboard/nameInputCard";

import { getGeneralSiteCardById } from "@/lib/actions/site";

import { SitePageParams } from "@/types";

const SiteSettingsPage = async ({ params: { siteId } }: SitePageParams) => {
  const siteCard = await getGeneralSiteCardById(siteId);
  if (!siteCard) {
    notFound();
  }
  return (
    <>
      <SiteCard {...siteCard} delete={false} settings={true} />
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
    </>
  );
};
export default SiteSettingsPage;

export const dynamicParams = true;

export const generateStaticParams = async () => {
  return [];
};
