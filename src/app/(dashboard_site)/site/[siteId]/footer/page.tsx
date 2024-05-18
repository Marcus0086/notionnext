import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { FOOTER_SETTINGS } from "@/components/dashboard/constants";
import LoadingCard from "@/components/dashboard/loadingCard";
import NameInputCard from "@/components/dashboard/nameInputCard";
import ToggleInputCard from "@/components/dashboard/toggleInput";

import { getFooterSiteCardById } from "@/lib/actions/site/get/footer";
import { isCardInput, isToggleInput } from "@/lib/inputs";

import getQueryClient from "@/context/queryClient";

import { SitePageParams } from "@/types/site";

export async function generateMetadata({
  params: { siteId },
}: SitePageParams): Promise<Metadata> {
  const footerCard = await getFooterSiteCardById(siteId);
  if (!footerCard) {
    return {
      title: "Footer Settings",
      description: "Update your Footer settings.",
    };
  }
  return {
    title: `${footerCard.name} | Footer Settings`,
    description: `Update your Footer settings for ${footerCard.name}.`,
  };
}

const FooterSettings = async ({ params: { siteId } }: SitePageParams) => {
  const footerSiteCard = await getFooterSiteCardById(siteId);
  if (!footerSiteCard || !footerSiteCard.siteConfig) {
    notFound();
  }
  const queryClient = getQueryClient();
  try {
    await queryClient.prefetchQuery({
      queryKey: ["footer", siteId],
      queryFn: () => getFooterSiteCardById(siteId),
    });
  } catch (error) {
    notFound();
  }
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      {FOOTER_SETTINGS.map((card, index) => (
        <Suspense key={card.title} fallback={<LoadingCard />}>
          {isCardInput(card.type) ? (
            <NameInputCard
              key={index}
              {...card}
              siteId={siteId}
              footerFootNote={footerSiteCard?.siteConfig?.footer_footnote}
              footerTitle={footerSiteCard?.siteConfig?.footer_title}
              footerStyle={footerSiteCard?.siteConfig?.footerStyle}
              footerIcons={footerSiteCard?.siteConfig?.footerIcons}
              type={card.type}
            />
          ) : isToggleInput(card.type) ? (
            <ToggleInputCard
              key={index}
              {...card}
              siteId={siteId}
              type={card.type}
            />
          ) : null}
        </Suspense>
      ))}
    </HydrationBoundary>
  );
};

export default FooterSettings;
