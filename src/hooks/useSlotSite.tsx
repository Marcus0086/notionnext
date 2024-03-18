import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { ProviderPageProps } from "@/types";

const useSlotSite = () => {
  const path = usePathname() || "";
  const query = useSearchParams();
  const pageId = query?.get("pageId");
  const siteId = path.split("/")[2];

  const siteUrl = useMemo(() => {
    let url = `/api/site?siteId=${siteId}`;
    if (pageId) {
      url += `&pageId=${pageId}`;
    }
    return url;
  }, [pageId, siteId]);

  const fetchSlotSite = async () => {
    if (siteId) {
      const res = await fetch(siteUrl);
      if (res.ok) {
        const data = await res.json();
        return data as ProviderPageProps;
      }
      return undefined;
    }
  };

  const { data } = useQuery({
    queryKey: ["slotSite", siteId, pageId],
    queryFn: fetchSlotSite,
    refetchOnWindowFocus: () => false,
    refetchIntervalInBackground: false,
    staleTime: Infinity,
  });

  return {
    pageProps: data,
    siteId,
  };
};

export default useSlotSite;
