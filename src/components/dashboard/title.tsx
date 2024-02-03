"use client";

import { useSelectedLayoutSegment } from "next/navigation";

const Titles: {
  [key: string]: string;
} = {
  "": "General",
  design: "Design",
  seo: "SEO",
  ai: "AI",
  options: "Options",
  navbar: "Navbar",
  footer: "Footer",
};

const Title = () => {
  const layout = useSelectedLayoutSegment();
  const currentTitle = Titles[layout || ""];
  return <>{currentTitle}</>;
};

export default Title;
