import { getAuthDomains } from "@/lib/siteDb";

const GET = async (req: Request) => {
  console.log("domain route", req.url);
  const query = new URL(req.url).searchParams;
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
