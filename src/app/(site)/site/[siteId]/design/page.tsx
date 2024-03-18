import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import { DESIGN_SETTINGS } from "@/components/dashboard/constants";
const NameInputCard = dynamic(
  () => import("@/components/dashboard/nameInputCard"),
);
const ColorPaletteDropDown = dynamic(
  () => import("@/components/dashboard/colorPaletteDropDown"),
);

import { getUserAccount } from "@/lib/actions/auth";
import { getDesignSiteCardById } from "@/lib/actions/site";

import { SitePageParams } from "@/types";

const DesignPage = async ({ params: { siteId } }: SitePageParams) => {
  const { siteCard, account } = await Promise.allSettled([
    getDesignSiteCardById(siteId),
    getUserAccount(),
  ]).then(([siteCard, account]) => ({
    siteCard: siteCard,
    account: account,
  }));

  if (siteCard.status === "rejected" || account.status === "rejected")
    notFound();

  const { siteIdCard, accountType } = {
    siteIdCard: siteCard.value,
    accountType: account.value,
  };
  return (
    <>
      <ColorPaletteDropDown account={accountType || "FREE"} />
      {DESIGN_SETTINGS.map((card) => (
        <NameInputCard
          {...card}
          {...siteIdCard}
          type={card.type}
          siteId={siteId}
          key={card.title}
        />
      ))}
    </>
  );
};

export default DesignPage;
