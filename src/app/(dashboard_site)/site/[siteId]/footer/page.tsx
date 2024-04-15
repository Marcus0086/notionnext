import { Suspense } from "react";
import { notFound } from "next/navigation";

import { FOOTER_SETTINGS } from "@/components/dashboard/constants";
import LoadingCard from "@/components/dashboard/loadingCard";
import NameInputCard from "@/components/dashboard/nameInputCard";

import { getFooterSiteCardById } from "@/lib/actions/site/get/footer";

import { SitePageParams } from "@/types/site";

const FooterSettings = async ({ params: { siteId } }: SitePageParams) => {
  const navSiteCard = await getFooterSiteCardById(siteId);
  if (!navSiteCard || !navSiteCard.siteConfig) {
    notFound();
  }
  return (
    <>
      {FOOTER_SETTINGS.map((card, index) => (
        <Suspense key={card.title} fallback={<LoadingCard />}>
          <NameInputCard
            key={index}
            {...card}
            {...navSiteCard}
            siteId={siteId}
            footerStyle={navSiteCard.siteConfig?.footerStyle || "none"}
            type={card.type}
          />
        </Suspense>
      ))}
    </>
  );
};

export default FooterSettings;