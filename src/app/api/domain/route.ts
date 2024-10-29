import { getAuthDomains } from "@/lib/siteDb";
import { NextRequest } from "next/server";

const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams;
  const domain = query.get("domain") || "";
  const siteDomain = domain.endsWith(`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : domain;
  const data = await getAuthDomains();
  if (data.includes(siteDomain)) {
    return Response.json(siteDomain, {
      status: 200,
    });
  } else {
    return Response.json(siteDomain, {
      status: 404,
    });
  }
};

export { GET };
