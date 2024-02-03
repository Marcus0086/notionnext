import SaveReset from "@/components/dashboard/saveReset";

import { SitePageParams } from "@/types";

const SaveSeoSettings = ({ params: { siteId } }: SitePageParams) => {
  return <SaveReset siteId={siteId} />;
};

export default SaveSeoSettings;
