"use client";

import React from "react";
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
  nav: "Navbar",
  footer: "Footer",
  domains: "Domains",
};

const Title = ({ children }: { children?: React.ReactNode }) => {
  const layout = useSelectedLayoutSegment();
  const currentTitle = Titles[layout || ""];
  return (
    <>
      {currentTitle}
      {children}
    </>
  );
};

export default Title;
