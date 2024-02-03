import { VisibilityFilter } from "@prisma/client";
import { NextResponse } from "next/server";

import { getSiteSiteConfig } from "@/lib/siteDb";
import { getSiteMap } from "@/lib/getSiteMap";
import { sitePage } from "@/lib/actions/site";
import getSessionUser from "@/lib/getSession";

import { _SiteData } from "@/types";

const GET = async (req: Request) => {
  const query = new URL(req.url).searchParams;
  const site = query.get("site") || "";
  const siteId = query.get("siteId");
  const pageId = query.get("pageId") || undefined;
  let data: _SiteData | null;

  try {
    if (!siteId) {
      data = await getSiteSiteConfig({ site: site });
      if (!data || data.visibility !== VisibilityFilter.LIVE) {
        return Response.json(
          {
            error: "Site not found",
          },
          {
            status: 404,
          }
        );
      }
      if (pageId) {
        const siteMap = await getSiteMap(data.siteConfig);
        if (!siteMap.canonicalPageMap[pageId]) {
          return Response.json(
            {
              error: "Page not found",
            },
            {
              status: 404,
            }
          );
        }
      }
    } else {
      const user = await getSessionUser();
      if (!user) {
        return Response.json(
          {
            error: "Unauthorized request",
          },
          {
            status: 404,
          }
        );
      }

      const siteData = await sitePage(siteId, false, true, undefined, pageId);

      return Response.json(siteData, {
        status: 200,
      });
    }

    return Response.json(data, {
      status: 200,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Site not found",
      },
      {
        status: 404,
      }
    );
  }
};

const OPTIONS = async () => {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
};

export { GET, OPTIONS };
