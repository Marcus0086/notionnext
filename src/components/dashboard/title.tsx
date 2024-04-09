"use client";

import { useSelectedLayoutSegment } from "next/navigation";

const Titles: {
  [key: string]: string;
} = {
  "": "General",
  design: "Design",
  seo: "SEO",
  ai: "AI",
  code: "Code",
  options: "Options",
  navbar: "Navbar",
  footer: "Footer",
  domains: "Domains",
};

const Title = () => {
  const layout = useSelectedLayoutSegment();
  const currentTitle = Titles[layout || ""];
  return <>{currentTitle}</>;
};

export default Title;
