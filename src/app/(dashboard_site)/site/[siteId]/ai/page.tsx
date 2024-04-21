import SiteAIPages from "@/components/dashboard/siteAIPages";

import { SitePageParams } from "@/types";

const AIChatSettings = async ({
  params: { siteId },
  searchParams,
}: SitePageParams) => {
  const page = parseInt((searchParams?.["kb"] as string) || "0");
  return <SiteAIPages siteId={siteId} page={page} />;
};

export default AIChatSettings;
