"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import SaveResetButtons from "@/components/dashboard/saveResetButtons";
import { useParentPageSettings } from "@/context/parentPage";

import { saveSiteData } from "@/lib/actions/site";

import useToast from "@/hooks/useToast";

const SaveReset = ({ siteId }: { siteId: string }) => {
  const toastOptions = useToast();
  const { settings, setSettings } = useParentPageSettings();
  const [saved, setSaved] = useState(false);

  const queryClient = useQueryClient();

  const handleSave = async () => {
    setSaved(true);
    const data = {
      ...(settings?.miscelanous?.visibility && {
        visibility: settings?.miscelanous?.visibility,
      }),
      ...(settings?.miscelanous?.css && {
        css: settings?.miscelanous?.css,
      }),
      ...(settings?.miscelanous?.html && {
        html: settings?.miscelanous?.html,
      }),
      ...(settings?.miscelanous?.javascript && {
        javascript: settings?.miscelanous?.javascript,
      }),
      ...(settings?.miscelanous?.fontFamily && {
        fontFamily: settings?.miscelanous?.fontFamily,
      }),
      ...(settings?.miscelanous?.name && {
        name: settings?.miscelanous.name,
        subDomain: settings?.miscelanous?.name,
      }),
      ...(settings?.miscelanous?.description && {
        description: settings?.miscelanous?.description,
      }),
      ...(settings?.miscelanous?.isSearchEnabled !== undefined && {
        isSearchEnabled: settings?.miscelanous?.isSearchEnabled,
        hasSiteConfigData: true,
      }),
      ...(settings?.miscelanous?.isAiSearchEnabled !== undefined && {
        isAiSearchEnabled: settings?.miscelanous?.isAiSearchEnabled,
        hasSiteConfigData: true,
      }),
      ...(settings?.miscelanous?.isDarkModeEnabled !== undefined && {
        isDarkModeEnabled: settings?.miscelanous?.isDarkModeEnabled,
        hasSiteConfigData: true,
      }),
      ...(settings?.miscelanous?.isTweetEmbedSupportEnabled !== undefined && {
        isTweetEmbedSupportEnabled:
          settings?.miscelanous?.isTweetEmbedSupportEnabled,
        hasSiteConfigData: true,
      }),
      ...(settings?.miscelanous?.isPreviewImageSupportEnabled !== undefined && {
        isPreviewImageSupportEnabled:
          settings?.miscelanous?.isPreviewImageSupportEnabled,
        hasSiteConfigData: true,
      }),
      ...(settings?.miscelanous?.isTopLoadingBarEnabled !== undefined && {
        isTopLoadingBarEnabled: settings?.miscelanous?.isTopLoadingBarEnabled,
        hasSiteConfigData: true,
      }),
      ...(settings?.miscelanous?.includeNotionIdInUrls !== undefined && {
        includeNotionIdInUrls: settings?.miscelanous?.includeNotionIdInUrls,
        hasSiteConfigData: true,
      }),
    };
    const site = await saveSiteData(siteId, data);
    if (site && site.id) {
      toast.success("Site saved successfully!", toastOptions);
    } else {
      toast.error("Something went wrong!", toastOptions);
    }
    setSaved(false);
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === "slotSite",
    });
  };
  const handleReset = () => {
    if (settings?.site) {
      setSettings({
        ...settings,
        site: {
          ...settings?.site,
          css: "",
        },
        miscelanous: {},
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
