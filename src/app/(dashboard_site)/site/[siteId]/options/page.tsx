import { notFound } from "next/navigation";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import dynamic from "next/dynamic";

import { OPTIONS_SETTINGS } from "@/components/dashboard/constants";
const ToggleInput = dynamic(() => import("@/components/dashboard/toggleInput"));

import getQueryClient from "@/context/queryClient";
import { getOptionsSiteCardById } from "@/lib/actions/site";

import { SitePageParams } from "@/types";

const OptionsPage = async ({ params: { siteId } }: SitePageParams) => {
  const queryClient = getQueryClient();
  try {
    await queryClient.prefetchQuery({
      queryKey: ["options", siteId],
      queryFn: () => getOptionsSiteCardById(siteId),
    });
  } catch (error) {
    notFound();
  }
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      {OPTIONS_SETTINGS.map((card, index) => (
        <ToggleInput key={index} {...card} siteId={siteId} />
      ))}
    </HydrationBoundary>
  );
};

export default OptionsPage;

export const dynamicParams = true;

export const generateStaticParams = async () => {
  return [];
};
