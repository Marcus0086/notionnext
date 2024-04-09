"use server";

const purifyHtml = async (html: string) => {
  if (!html) return "";
  console.log("Purifying HTML", html);
  const DomPurify = (await import("isomorphic-dompurify")).default;
  const clean = DomPurify.sanitize(html, {});
  console.log("Cleaned HTML", clean);
  return clean;
};

export { purifyHtml };
