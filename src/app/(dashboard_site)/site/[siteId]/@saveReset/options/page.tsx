import SaveReset from "@/components/dashboard/saveReset";

import { SitePageParams } from "@/types";

const OptionsSaveSettings = ({ params: { siteId } }: SitePageParams) => {
  return <SaveReset siteId={siteId} />;
};

export default OptionsSaveSettings;
