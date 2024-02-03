import { Hydrate, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import SiteAIPages from "@/components/dashboard/siteAIPages";

import getQueryClient from "@/context/queryClient";
import { getSiteDocuments } from "@/lib/actions/site";

import { SitePageParams } from "@/types";

const AIChatSettings = async ({ params: { siteId } }: SitePageParams) => {
  const queryClient = getQueryClient();
  try {
    await queryClient.fetchQuery(["pages", siteId], () =>
      getSiteDocuments(siteId)
    );
  } catch (error) {
    notFound();
  }
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <SiteAIPages siteId={siteId} />
    </Hydrate>
  );
};

export default AIChatSettings;

export const dynamicParams = true;

export const generateStaticParams = async () => {
  return [];
};
