import SaveReset from "@/components/dashboard/saveReset";

import { SitePageParams } from "@/types";

const SaveSettings = ({ params: { siteId } }: SitePageParams) => {
  return <SaveReset siteId={siteId} />;
};

export default SaveSettings;
