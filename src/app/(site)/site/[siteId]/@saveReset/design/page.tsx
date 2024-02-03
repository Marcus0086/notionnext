import SaveReset from "@/components/dashboard/saveReset";

import { SitePageParams } from "@/types";

const SaveDesignSettings = ({ params: { siteId } }: SitePageParams) => {
  return <SaveReset siteId={siteId} />;
};

export default SaveDesignSettings;
