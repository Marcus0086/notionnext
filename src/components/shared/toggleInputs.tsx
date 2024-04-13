"use client";

import { Switch } from "@headlessui/react";
import { useReducer } from "react";
import { useQuery } from "@tanstack/react-query";

import { useParentPageSettings } from "@/context/parentPage";
import { getOptionsSiteCardById } from "@/lib/actions/site";

import { ToggleInputs, ToggleState, ToggleAction } from "@/types";

const ToggleButton = ({
  value,
  type,
}: {
  value?: boolean;
  type: ToggleInputs;
}) => {
  const { setSettings } = useParentPageSettings();

  const themeReducer = (state: ToggleState, action: ToggleAction) => {
    switch (action.type) {
      case "toggle":
        setSettings((settings) => ({
          ...settings,
          config: {
            ...settings?.config,
            id: settings?.config?.id || "",
            rootNotionPageId: settings?.config?.rootNotionPageId || "",
            rootNotionSpaceId: settings?.config?.rootNotionSpaceId || "",
            name: settings?.config?.name || "",
            domain: settings?.config?.domain || "",
            author: settings?.config?.author || "",
            isDarkModeEnabled:
              type === "theme"
                ? !state.enabled
                : settings?.config?.isDarkModeEnabled || false,
            isSearchEnabled:
              type === "search"
                ? !state.enabled
                : settings?.config?.isSearchEnabled || false,
            isAiSearchEnabled:
              type === "ai"
                ? !state.enabled
                : settings?.config?.isAiSearchEnabled || false,
            isSiteMapEnabled:
              type === "sitemap"
                ? !state.enabled
                : settings?.config?.isSiteMapEnabled || false,
            isIndexingEnabled:
              type === "indexing"
                ? !state.enabled
                : settings?.config?.isIndexingEnabled || false,
          },
          miscelanous: {
            ...settings?.miscelanous,
            ...(type === "theme" && {
              isDarkModeEnabled: !state.enabled,
            }),
            ...(type === "search" && {
              isSearchEnabled: !state.enabled,
            }),
            ...(type === "ai" && {
              isAiSearchEnabled: !state.enabled,
            }),
            ...(type === "preview" && {
              isPreviewImageSupportEnabled: !state.enabled,
            }),
            ...(type === "twitter" && {
              isTweetEmbedSupportEnabled: !state.enabled,
            }),
            ...(type === "toploader" && {
              isTopLoadingBarEnabled: !state.enabled,
            }),
            ...(type === "prettyurls" && {
              includeNotionIdInUrls: !state.enabled,
            }),
            ...(type === "sitemap" && {
              isSiteMapEnabled: !state.enabled,
            }),
            ...(type === "indexing" && {
              isIndexingEnabled: !state.enabled,
            }),
          },
        }));
        return { enabled: !state.enabled };
      default:
        return state;
    }
  };
  const [{ enabled }, dispatch] = useReducer(themeReducer, {
    enabled: value || false,
  });

  const handleChecked = () => {
    dispatch({ type: "toggle" });
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleChecked}
      className={`${
        enabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
      } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out`}
    >
      <span className="sr-only">Toggle button</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block w-4 h-4 transform bg-white dark:bg-gray-300 rounded-full transition-transform duration-200 ease-in-out`}
      />
    </Switch>
  );
};

const ThemeToggle = ({ siteId }: { siteId: string }) => {
  const { data } = useQuery({
    queryKey: ["options", siteId],
    queryFn: () => getOptionsSiteCardById(siteId),
    placeholderData: null,
    staleTime: Infinity,
  });

  const value = data?.siteConfig?.isDarkModeEnabled || false;

  return <ToggleButton value={value} type="theme" />;
};

const SearchToggle = ({ siteId }: { siteId: string }) => {
  const { data } = useQuery({
    queryKey: ["options", siteId],
    queryFn: () => getOptionsSiteCardById(siteId),
    placeholderData: null,
    staleTime: Infinity,
  });

  const value = data?.siteConfig?.isSearchEnabled || false;

  return <ToggleButton value={value} type="search" />;
};

const AiToggle = ({ siteId }: { siteId: string }) => {
  const { data } = useQuery({
    queryKey: ["options", siteId],
    queryFn: () => getOptionsSiteCardById(siteId),
    placeholderData: null,
    staleTime: Infinity,
  });

  const value = data?.siteConfig?.isAiSearchEnabled || false;

  return <ToggleButton value={value} type="ai" />;
};

const PreviewToggle = ({ siteId }: { siteId: string }) => {
  const { data } = useQuery({
    queryKey: ["options", siteId],
    queryFn: () => getOptionsSiteCardById(siteId),
    placeholderData: null,
    staleTime: Infinity,
  });

  const value = data?.siteConfig?.isPreviewImageSupportEnabled || false;

  return <ToggleButton value={value} type="preview" />;
};

const TwitterToggle = ({ siteId }: { siteId: string }) => {
  const { data } = useQuery({
    queryKey: ["options", siteId],
    queryFn: () => getOptionsSiteCardById(siteId),
    placeholderData: null,
    staleTime: Infinity,
  });

  const value = data?.siteConfig?.isTweetEmbedSupportEnabled || false;

  return <ToggleButton value={value} type="twitter" />;
};

const TopLoaderToggle = ({ siteId }: { siteId: string }) => {
  const { data } = useQuery({
    queryKey: ["options", siteId],
    queryFn: () => getOptionsSiteCardById(siteId),
    placeholderData: null,
    staleTime: Infinity,
  });

  const value = data?.siteConfig?.isTopLoadingBarEnabled || false;

  return <ToggleButton value={value} type="toploader" />;
};

const IncludeNotionIdInUrlsToggle = ({ siteId }: { siteId: string }) => {
  const { data } = useQuery({
    queryKey: ["options", siteId],
    queryFn: () => getOptionsSiteCardById(siteId),
    placeholderData: null,
    staleTime: Infinity,
  });

  const value = data?.siteConfig?.includeNotionIdInUrls || false;

  return <ToggleButton value={value} type="prettyurls" />;
};

const SiteMapToggle = ({ siteId }: { siteId: string }) => {
  const { data } = useQuery({
    queryKey: ["seo", siteId],
    queryFn: () => getOptionsSiteCardById(siteId),
    placeholderData: null,
    staleTime: Infinity,
  });

  const value = data?.siteConfig?.isSiteMapEnabled || false;

  return <ToggleButton value={value} type="sitemap" />;
};

const IndexingToggle = ({ siteId }: { siteId: string }) => {
  const { data } = useQuery({
    queryKey: ["seo", siteId],
    queryFn: () => getOptionsSiteCardById(siteId),
    placeholderData: null,
    staleTime: Infinity,
  });

  const value = data?.siteConfig?.isIndexingEnabled || false;

  return <ToggleButton value={value} type="indexing" />;
};

export {
  ThemeToggle,
  SearchToggle,
  AiToggle,
  TwitterToggle,
  TopLoaderToggle,
  IncludeNotionIdInUrlsToggle,
  SiteMapToggle,
  PreviewToggle,
  IndexingToggle,
};
