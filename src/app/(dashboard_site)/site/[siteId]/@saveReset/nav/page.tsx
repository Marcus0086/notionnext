import SaveReset from "@/components/dashboard/saveReset";

import { SitePageParams } from "@/types";

const SaveNavSettings = ({ params: { siteId } }: SitePageParams) => {
  return <SaveReset siteId={siteId} />;
};

export default SaveNavSettings;
