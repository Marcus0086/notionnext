"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SiteSettings, SiteConfig, Site } from "@/types";
import { ExtendedRecordMap } from "notion-types";

const ParentPageSettingsStore = createContext({
  settings: {} as SiteSettings,
  setSettings: {} as Dispatch<SetStateAction<SiteSettings>>,
});

export const useParentPageSettings = () => useContext(ParentPageSettingsStore);

const ParentPageSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
  config?: SiteConfig;
  site?: Site;
  recordMap?: ExtendedRecordMap;
}) => {
  const [settings, setSettings] = useState<SiteSettings>({
    config: undefined,
    site: undefined,
    recordMap: undefined,
    miscelanous: undefined,
    siteMap: undefined,
  });
  const client = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={client}>
      <ParentPageSettingsStore.Provider value={{ settings, setSettings }}>
        {children}
      </ParentPageSettingsStore.Provider>
    </QueryClientProvider>
  );
};

export default ParentPageSettingsProvider;
