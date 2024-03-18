import { useMemo } from "react";

import { useParentPageSettings } from "@/context/parentPage";

import { domainSuffix } from "@/lib/config";

import { Site } from "@/types";
import { SiteConfig } from "@/types";

type SettingsItem = "siteMap" | "site" | "siteConfig";

const useSettings = (itemName: SettingsItem) => {
  const { settings } = useParentPageSettings();
  const siteUrl = useMemo(() => {
    const site = settings?.site;
    return `${site?.name}.${domainSuffix}`;
  }, [settings?.site]);

  const canonicalPageMap = useMemo(() => {
    const childLinks = Object.keys(
      settings?.siteMap?.canonicalPageMap || {},
    ).reduce((acc, key) => {
      const path = `${siteUrl}/${key}`;
      acc.push(path);
      return acc;
    }, [] as string[]);
    childLinks.push(siteUrl);
    return childLinks;
  }, [settings?.siteMap?.canonicalPageMap, siteUrl]);

  const settingsItems: {
    [key in SettingsItem]: string[] | Site | SiteConfig | undefined;
  } = {
    siteMap: canonicalPageMap,
    site: settings?.site,
    siteConfig: settings?.config,
  };
  const item = settingsItems[itemName];
  return item;
};

export default useSettings;
