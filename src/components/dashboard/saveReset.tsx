"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import SaveResetButtons from "@/components/dashboard/saveResetButtons";
import { useParentPageSettings } from "@/context/parentPage";

import { saveSiteData } from "@/lib/actions/site";

import { getCompressedFiles, saveFooterIcons } from "@/lib/actions/site/save";
import ActivityLogger from "@/lib/logger";
import { domainSuffix } from "@/lib/config";

import useToast from "@/hooks/useToast";

import { SiteSettings } from "@/types/site";
import { revalidateSite } from "@/lib/siteDb";

const generateLogMessage = (updatedData: any) => {
  const changes = [
    {
      field: "visibility",
      message: `Changed visibility to ${updatedData?.visibility}`,
    },
    { field: "name", message: `Changed name to ${updatedData?.name}` },
    {
      field: "description",
      message: `Changed description to ${updatedData?.description?.slice(
        0,
        100,
      )}`,
    },
    { field: "css", message: "Changed css" },
    { field: "html", message: "Changed html" },
    { field: "javascript", message: "Changed javascript" },
    {
      field: "fontFamily",
      message: `Changed fontFamily to ${updatedData?.fontFamily}`,
    },
    {
      field: "isSearchEnabled",
      message: `Changed isSearchEnabled to ${updatedData?.isSearchEnabled}`,
    },
    {
      field: "isAiSearchEnabled",
      message: `Changed isAiSearchEnabled to ${updatedData?.isAiSearchEnabled}`,
    },
    {
      field: "isDarkModeEnabled",
      message: `Changed isDarkModeEnabled to ${updatedData?.isDarkModeEnabled}`,
    },
    {
      field: "isTweetEmbedSupportEnabled",
      message: `Changed isTweetEmbedSupportEnabled to ${updatedData?.isTweetEmbedSupportEnabled}`,
    },
    {
      field: "isPreviewImageSupportEnabled",
      message: `Changed isPreviewImageSupportEnabled to ${updatedData?.isPreviewImageSupportEnabled}`,
    },
    {
      field: "isTopLoadingBarEnabled",
      message: `Changed isTopLoadingBarEnabled to ${updatedData?.isTopLoadingBarEnabled}`,
    },
    {
      field: "includeNotionIdInUrls",
      message: `Changed includeNotionIdInUrls to ${updatedData?.includeNotionIdInUrls}`,
    },
  ];

  for (const change of changes) {
    if (updatedData?.[change.field] !== undefined) {
      return change.message;
    }
  }

  return "Updated site successfully";
};

const getUpdatedData = (
  settings: SiteSettings,
  savedUris: Record<string, string>,
) => {
  const updatedData: any = {};
  if (settings?.miscelanous?.visibility) {
    updatedData.visibility = settings.miscelanous.visibility;
  }

  if (typeof settings?.miscelanous?.css === "string") {
    updatedData.css = savedUris["css"];
  }

  if (typeof settings?.miscelanous?.html === "string") {
    updatedData.html = savedUris["html"];
  }

  if (typeof settings?.miscelanous?.javascript === "string") {
    updatedData.javascript = savedUris["javascript"];
  }

  if (settings?.miscelanous?.fontFamily) {
    updatedData.fontFamily = settings.miscelanous.fontFamily;
  }

  if (settings?.miscelanous?.name) {
    updatedData.name = settings.miscelanous.name;
    updatedData.subDomain = settings.miscelanous.name;
  }

  if (typeof settings?.miscelanous?.description === "string") {
    updatedData.description = settings.miscelanous.description;
  }

  if (typeof settings?.miscelanous?.main_title_size === "string") {
    if (!updatedData["siteConfig"]) {
      updatedData["siteConfig"] = {};
    }
    updatedData["siteConfig"]["main_title_size"] =
      settings.miscelanous.main_title_size;
  }

  if (typeof settings?.miscelanous?.main_text_size === "string") {
    if (!updatedData["siteConfig"]) {
      updatedData["siteConfig"] = {};
    }
    updatedData["siteConfig"]["main_text_size"] =
      settings.miscelanous.main_text_size;
  }

  const miscelanousSettings = [
    "isSearchEnabled",
    "isAiSearchEnabled",
    "isDarkModeEnabled",
    "isTweetEmbedSupportEnabled",
    "isPreviewImageSupportEnabled",
    "isTopLoadingBarEnabled",
    "includeNotionIdInUrls",
    "isSiteMapEnabled",
    "isIndexingEnabled",
    "navigationStyle",
    "footerStyle",
    "footer_footnote",
    "footer_title",
    "footer_divider",
  ];

  const colorKeys = [
    "main_bg",
    "main_bg_dark",
    "navbar_bg",
    "navbar_bg_dark",
    "footer_bg",
    "footer_bg_dark",
    "main_text_color",
    "main_text_color_dark",
    "navbar_text_color",
    "navbar_text_color_dark",
    "footer_text_color",
    "footer_text_color_dark",
  ];

  miscelanousSettings.forEach((setting) => {
    if (settings?.miscelanous?.[setting] !== undefined) {
      if (!updatedData["siteConfig"]) {
        updatedData["siteConfig"] = {};
      }
      updatedData["siteConfig"][setting] = settings.miscelanous[setting];
    }
  });

  colorKeys.forEach((colorKey) => {
    const color = settings?.miscelanous?.[colorKey];
    if (typeof color === "string") {
      if (!updatedData["siteConfig"]) {
        updatedData["siteConfig"] = {};
      }
      updatedData["siteConfig"][colorKey] = color;
    }
  });

  return updatedData;
};

const SaveReset = ({ siteId }: { siteId: string }) => {
  const toastOptions = useToast();
  const { settings, setSettings } = useParentPageSettings();
  const [saved, setSaved] = useState(false);

  const queryClient = useQueryClient();

  const handleSave = async () => {
    setSaved(true);
    const files: Record<string, string> = {
      css: settings?.miscelanous?.["css"] as string,
      html: settings?.miscelanous?.["html"] as string,
      javascript: settings?.miscelanous?.["javascript"] as string,
    };
    const currentSiteName =
      settings?.site?.customDomain ||
      `${settings?.site?.subDomain}.${domainSuffix}`.replace(":3000", "") ||
      "";
    const savedUris = await getCompressedFiles(files);
    const updatedData: any = getUpdatedData(settings, savedUris);
    const isSiteNameChanged = Object.keys(updatedData).includes("name");
    let footerIconsData;
    if (settings?.config?.footerIcons !== undefined && settings?.config?.id) {
      footerIconsData = saveFooterIcons(
        settings?.config.id,
        settings?.config.footerIcons,
      );
    }
    const siteData = saveSiteData(siteId, updatedData);
    const results = await Promise.allSettled([siteData, footerIconsData]);

    const [siteDataResult, footerIconsResult] = results;

    if (footerIconsResult.status === "rejected") {
      toast.error(footerIconsResult.reason, toastOptions);
    }

    if (siteDataResult.status === "rejected") {
      toast.error(siteDataResult.reason, toastOptions);
    }

    const updatedFooterIconsData =
      footerIconsResult.status === "fulfilled" ? footerIconsResult.value : null;
    const updatedSiteData =
      siteDataResult.status === "fulfilled" ? siteDataResult.value : null;

    const siteName =
      updatedSiteData?.site?.customDomain ||
      `${updatedSiteData?.site?.subDomain}.${domainSuffix}`.replace(
        ":3000",
        "",
      ) ||
      "";

    if (
      (updatedSiteData && updatedSiteData?.site?.id) ||
      updatedFooterIconsData?.footerIcons
    ) {
      toast.success("Site saved successfully!", toastOptions);
      ActivityLogger.updateSite({
        data: {
          site: siteName,
          log: generateLogMessage(updatedData),
        },
      });
    } else if (updatedSiteData?.error) {
      toast.error(updatedSiteData.error, toastOptions);
      ActivityLogger.updateSite({
        data: {
          site: siteName,
          log: `Failed to update site ${siteName}.`,
          error: updatedSiteData.error,
        },
      });
    }
    setSaved(false);
    if (isSiteNameChanged) {
      await revalidateSite(currentSiteName);
    }
    queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey[0] === "slotSite" && query.queryKey[1] === siteId,
    });
    queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey[0] === "options" && query.queryKey[1] === siteId,
    });
  };
  const handleReset = () => {
    if (settings?.site) {
      setSettings({
        ...settings,
        site: {
          ...settings?.site,
          css: "",
          javascript: "",
          html: "",
          fontFamily: "default",
        },
        miscelanous: {},
        config: {
          ...settings?.config,
          id: settings?.config?.id || "",
          rootNotionPageId: settings?.config?.rootNotionPageId || "",
          rootNotionSpaceId: settings?.config?.rootNotionSpaceId || "",
          name: settings?.config?.name || "",
          domain: settings?.config?.domain || "",
          author: settings?.config?.author || "",
          main_bg: undefined,
          navbar_bg: undefined,
          main_text_color: undefined,
          navbar_text_color: undefined,
          main_title_size: undefined,
          main_text_size: undefined,
        },
      });
    }
  };
  return (
    <SaveResetButtons
      handleSave={handleSave}
      handleReset={handleReset}
      saved={saved}
    />
  );
};

export default SaveReset;
