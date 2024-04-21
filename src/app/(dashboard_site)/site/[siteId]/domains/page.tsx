import { notFound } from "next/navigation";
import { Metadata } from "next";

import { DOMAIN_SETTINGS } from "@/components/dashboard/constants";
import NameInputCard from "@/components/dashboard/nameInputCard";
import UpgradePlanCard from "@/components/dashboard/upgradePlanCard";

import { getDomainsSiteCardById } from "@/lib/actions/site";

import { CardInputs, SitePageParams } from "@/types";

export async function generateMetadata({
  params: { siteId },
}: SitePageParams): Promise<Metadata> {
  const domainCard = await getDomainsSiteCardById(siteId);
  if (!domainCard) {
    return {
      title: "Domain Settings",
      description: "Update your domain settings.",
    };
  }
  return {
    title: `${domainCard.name} | Domain Settings`,
    description: `Update your options settings for ${domainCard.name}.`,
  };
}

const DomainsSettingsPage = async ({ params: { siteId } }: SitePageParams) => {
  const domainsSiteCard = await getDomainsSiteCardById(siteId);
  if (!domainsSiteCard) {
    notFound();
  }
  return (
    <>
      <UpgradePlanCard type="domains" />
      {DOMAIN_SETTINGS.map((card, index) => (
        <NameInputCard
          key={index}
          {...card}
          {...domainsSiteCard}
          siteTitle={domainsSiteCard?.name}
          siteId={siteId}
          type={card.type as CardInputs}
        />
      ))}
    </>
  );
};

export default DomainsSettingsPage;
