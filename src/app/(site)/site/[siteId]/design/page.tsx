import { notFound } from "next/navigation";

import Editor from "@/components/dashboard/editor";
import { DESIGN_SETTINGS } from "@/components/dashboard/constants";
import NameInputCard from "@/components/dashboard/nameInputCard";
import ThemeDropDown from "@/components/dashboard/themeDropDown";

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
      {["Free", "Paid"].map((title, index) => (
        <ThemeDropDown
          key={index}
          title={title}
          account={accountType || "FREE"}
        />
      ))}
      {DESIGN_SETTINGS.map((card) => (
        <NameInputCard
          {...card}
          {...siteIdCard}
          type={card.type}
          siteId={siteId}
          key={card.title}
        />
      ))}
      <Editor siteId={siteId} />
    </>
  );
};

export default DesignPage;
