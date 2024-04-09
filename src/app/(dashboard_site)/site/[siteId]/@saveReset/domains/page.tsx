import SaveReset from "@/components/dashboard/saveReset";

import { SitePageParams } from "@/types";

const SaveDomainsSettings = ({ params: { siteId } }: SitePageParams) => {
  return <SaveReset siteId={siteId} />;
};

export default SaveDomainsSettings;
