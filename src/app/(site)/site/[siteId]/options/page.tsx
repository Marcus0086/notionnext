import { notFound } from "next/navigation";
import { Hydrate, dehydrate } from "@tanstack/react-query";

import { OPTIONS_SETTINGS } from "@/components/dashboard/constants";
import ToggleInput from "@/components/dashboard/toggleInput";

import getQueryClient from "@/context/queryClient";
import { getOptionsSiteCardById } from "@/lib/actions/site";

import { SitePageParams } from "@/types";

const OptionsPage = async ({ params: { siteId } }: SitePageParams) => {
  const queryClient = getQueryClient();
  try {
    await queryClient.prefetchQuery(["options", siteId], () =>
      getOptionsSiteCardById(siteId)
    );
  } catch (error) {
    notFound();
  }
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      {OPTIONS_SETTINGS.map((card, index) => (
        <ToggleInput key={index} {...card} siteId={siteId} />
      ))}
    </Hydrate>
  );
};

export default OptionsPage;

export const dynamicParams = true;

export const generateStaticParams = async () => {
  return [];
};
