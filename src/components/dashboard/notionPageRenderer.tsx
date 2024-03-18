import NotionPage from "@/components/notionPage";

import { useParentPageSettings } from "@/context/parentPage";

import { cn } from "@/lib/utils";

import { PageProps } from "@/types";

const NotionPageRenderer = (pageProps: Partial<PageProps>) => {
  const {
    settings: { config, site, recordMap, miscelanous },
  } = useParentPageSettings();
  return (
    <div
      className={cn(
        "h-full transition-all duration-150 ease-in-out",
        miscelanous?.display === "desktop" ? "w-full" : "",
        miscelanous?.display === "tablet" ? "w-2/3" : "",
        miscelanous?.display === "mobile" ? "w-2/5" : "",
        !miscelanous?.display ? "w-full" : "",
      )}
    >
      <NotionPage
        config={config}
        site={site}
        recordMap={recordMap}
        pageId={pageProps?.pageId}
        error={pageProps?.error}
        key={pageProps?.pageId}
      />
    </div>
  );
};

export default NotionPageRenderer;
