import SaveReset from "@/components/dashboard/saveReset";

import { SitePageParams } from "@/types";

const SaveCodeSettings = ({ params: { siteId } }: SitePageParams) => {
  return <SaveReset siteId={siteId} />;
};

export default SaveCodeSettings;
