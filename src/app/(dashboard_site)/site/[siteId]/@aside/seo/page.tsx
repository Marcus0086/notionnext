import SettingsAside from "@/components/dashboard/settingsAside";
import { SETTINGS_ASIDE_MENU } from "@/components/dashboard/constants";

import { SitePageParams } from "@/types";

const AsideForSeoSlot = ({ params: { siteId } }: SitePageParams) => {
  return <SettingsAside items={SETTINGS_ASIDE_MENU} siteId={siteId} />;
};

export default AsideForSeoSlot;