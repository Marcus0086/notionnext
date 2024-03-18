import { notFound } from "next/navigation";

import SiteAIPages from "@/components/dashboard/siteAIPages";

import { sitePage } from "@/lib/actions/site";

import { SitePageParams } from "@/types";

const AIChatSettings = async ({
  params: { siteId },
  searchParams,
}: SitePageParams) => {
  let site = null;
  try {
    site = await sitePage(siteId, true, false);
  } catch (error) {
    notFound();
  }
  if (!site || !site.siteMap) {
    notFound();
  }
  const siteMap = site?.siteMap;
  const page = parseInt((searchParams?.["kb"] as string) || "0");
  return <SiteAIPages siteMap={siteMap} siteId={siteId} page={page} />;
};

export default AIChatSettings;
