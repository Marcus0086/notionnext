import { notFound } from "next/navigation";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import NotionPage from "@/components/notionPage";

import { fetcher } from "@/lib/siteDb";
import { getSiteMetaData } from "@/lib/siteMetaData";

import { _SiteData } from "@/types";
import { PageProps } from "@/types";

export const generateMetadata = async ({
  params: { site },
}: {
  params: {
    site: string[];
  };
}) => {
  try {
    const data = await fetcher("site", site);
    if (!data) notFound();
    const metaData = getSiteMetaData(data) as Metadata;
    return metaData;
  } catch (error) {
    console.log(error);
    notFound();
  }
};

const DomainPage = async ({
  params: { site },
}: {
  params: {
    site: string[];
  };
}) => {
  let pageProps: PageProps | undefined;
  try {
    const data = await fetcher("site", site);
    pageProps = data;
  } catch (error) {
    console.log(error);
    notFound();
  }

  if (!pageProps) {
    notFound();
  }

  return (
    <>
      {pageProps?.config?.isTopLoadingBarEnabled && (
        <NextTopLoader showSpinner={false} />
      )}
      <NotionPage {...pageProps} />
    </>
  );
};

export default DomainPage;

export const dynamicParams = true;

export const generateStaticParams = async () => {
  return [];
};
