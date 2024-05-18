import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

import { DEMOS } from "@/components/dashboard/constants";
import LoadingCard from "@/components/dashboard/loadingCard";
import Hero from "@/components/hero";
import ProductTimeline from "@/components/productTimeline";
const HeroParallax = dynamic(() => import("@/components/heroParallax"));

import { config } from "@/config";

export const metadata: Metadata = {
  title: config.META_DATA.HOME_PAGE.TITLE,
  description: config.META_DATA.HOME_PAGE.DESCRIPTION,
  openGraph: {
    title: config.META_DATA.HOME_PAGE.TITLE,
    description: config.META_DATA.HOME_PAGE.DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: config.META_DATA.HOME_PAGE.TITLE,
    description: config.META_DATA.HOME_PAGE.DESCRIPTION,
  },
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <section className="mb-36">
        <Suspense fallback={<LoadingCard />}>
          <HeroParallax products={DEMOS} />
        </Suspense>
      </section>
      <ProductTimeline />
    </>
  );
};

export default HomePage;
