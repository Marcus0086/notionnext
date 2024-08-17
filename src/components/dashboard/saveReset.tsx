"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

import SaveResetButtons from "@/components/dashboard/saveResetButtons";
import { useParentPageSettings } from "@/context/parentPage";

import { saveSiteData } from "@/lib/actions/site";

import ActivityLogger from "@/lib/logger";
import { getCompressedFiles, saveFooterIcons } from "@/lib/actions/site/save";
import { domainSuffix } from "@/lib/config";
import { revalidateSite } from "@/lib/siteDb";
import {
  generateLogMessage,
  getUpdatedData,
  getResetDesignSettings,
  getResetGeneralSettings,
  getResetSeoSettings,
} from "@/lib/saveReset";

import useToast from "@/hooks/useToast";

const SaveReset = ({ siteId }: { siteId: string }) => {
  const toastOptions = useToast();
  const { settings, setSettings } = useParentPageSettings();
  const [saved, setSaved] = useState(false);
  const path = usePathname();

  const queryClient = useQueryClient();

  const currentSettings = structuredClone(settings);

  const miscelanousSettings = structuredClone(settings?.miscelanous);

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
        settings?.config.footerIcons
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
        ""
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
    if (miscelanousSettings) {
      const resetGeneralSettings = getResetGeneralSettings(
        currentSettings,
        miscelanousSettings
      );
      setSettings({
        ...settings,
        miscelanous: {
          ...resetGeneralSettings,
        },
      });
      if (path.includes("/design")) {
        const resetDesignSettings = getResetDesignSettings(miscelanousSettings);
        setSettings({
          ...settings,
          site: {
            ...settings?.site,
            ...currentSettings?.fullSiteClone?.site,
            id: settings?.site?.id || "",
            userId: settings?.site?.userId || "",
            name: settings?.site?.name || "",
            rootNotionPageId: settings?.site?.rootNotionPageId || "",
            rootNotionSpaceId: settings?.site?.rootNotionSpaceId || "",
            fontFamily: currentSettings?.fullSiteClone?.site?.fontFamily || "",
          },
          config: {
            ...settings?.config,
            ...currentSettings?.fullSiteClone?.config,
            id: settings?.config?.id || "",
            rootNotionPageId: settings?.config?.rootNotionPageId || "",
            name: settings?.config?.name || "",
            domain: settings?.config?.domain || "",
            author: settings?.config?.author || "",
          },
          miscelanous: {
            ...resetDesignSettings,
          },
        });
      }
      if (path.includes("/seo")) {
        const resetSeoSettings = getResetSeoSettings(miscelanousSettings);
        setSettings({
          ...settings,
          miscelanous: {
            ...resetSeoSettings,
          },
        });
      }
    }

    // if (settings?.site) {
    //   setSettings({
    //     ...settings,
    //     site: {
    //       ...settings?.site,
    //       css: "",
    //       javascript: "",
    //       html: "",
    //       fontFamily: "default",
    //     },
    //     miscelanous: {},
    //     config: {
    //       ...settings?.config,
    //       id: settings?.config?.id || "",
    //       rootNotionPageId: settings?.config?.rootNotionPageId || "",
    //       rootNotionSpaceId: settings?.config?.rootNotionSpaceId || "",
    //       name: settings?.config?.name || "",
    //       domain: settings?.config?.domain || "",
    //       author: settings?.config?.author || "",
    //       main_bg: undefined,
    //       navbar_bg: undefined,
    //       main_text_color: undefined,
    //       navbar_text_color: undefined,
    //       main_title_size: undefined,
    //       main_text_size: undefined,
    //     },
    //   });
    // }
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
