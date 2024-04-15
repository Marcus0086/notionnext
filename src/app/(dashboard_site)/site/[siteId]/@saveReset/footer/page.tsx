import SaveReset from "@/components/dashboard/saveReset";

import { SitePageParams } from "@/types";

const SaveFooterSettings = ({ params: { siteId } }: SitePageParams) => {
  return <SaveReset siteId={siteId} />;
};

export default SaveFooterSettings;
