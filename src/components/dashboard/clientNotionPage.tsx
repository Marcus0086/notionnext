"use client";

import { useEffect } from "react";

import NotionPageRenderer from "@/components/dashboard/notionPageRenderer";

import { useParentPageSettings } from "@/context/parentPage";

import { ProviderPageProps } from "@/types";

const ClientNotionPage = ({ pageProps }: { pageProps?: ProviderPageProps }) => {
  const { setSettings } = useParentPageSettings();
  useEffect(() => {
    setSettings({
      config: pageProps?.config,
      site: pageProps?.site,
      recordMap: pageProps?.recordMap,
      siteMap: pageProps?.siteMap,
      fullSiteClone: {
        site: Object.freeze(structuredClone(pageProps?.site)),
        config: Object.freeze(structuredClone(pageProps?.config)),
      },
    });
  }, [
    pageProps?.config,
    pageProps?.recordMap,
    pageProps?.site,
    pageProps?.siteMap,
    setSettings,
  ]);

  return <NotionPageRenderer {...pageProps} />;
};

export default ClientNotionPage;
