import { notFound } from "next/navigation";

import { DOMAIN_SETTINGS } from "@/components/dashboard/constants";
import NameInputCard from "@/components/dashboard/nameInputCard";

import { getDomainsSiteCardById } from "@/lib/actions/site";

import { CardInputs, SitePageParams } from "@/types";

const DomainsSettingsPage = async ({ params: { siteId } }: SitePageParams) => {
  const domainsSiteCard = await getDomainsSiteCardById(siteId);
  if (!domainsSiteCard) {
    notFound();
  }
  return (
    <>
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
