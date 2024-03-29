import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import {
  DESIGN_SETTINGS,
  DESIGN_SETTINGS_DROP_DOWN,
} from "@/components/dashboard/constants";
const NameInputCard = dynamic(
  () => import("@/components/dashboard/nameInputCard"),
);
const ColorPaletteDropDown = dynamic(
  () => import("@/components/dashboard/colorPaletteDropDown"),
);
const ColorPickerDropdown = dynamic(
  () => import("@/components/dashboard/colorPickerDropdown"),
);

import { getDesignSiteCardById } from "@/lib/actions/site";

import { SitePageParams } from "@/types";

const DesignPage = async ({ params: { siteId } }: SitePageParams) => {
  const siteCard = await getDesignSiteCardById(siteId);

  if (!siteCard) notFound();

  return (
    <>
      <ColorPaletteDropDown />
      {DESIGN_SETTINGS_DROP_DOWN.map(({ title, componentItems }, index) => (
        <ColorPickerDropdown
          title={title}
          componentItems={componentItems}
          key={index}
        />
      ))}
      {DESIGN_SETTINGS.map((card) => (
        <NameInputCard
          {...card}
          {...siteCard}
          type={card.type}
          siteId={siteId}
          key={card.title}
        />
      ))}
    </>
  );
};

export default DesignPage;
