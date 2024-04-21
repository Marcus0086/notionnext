import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

import { DEMOS } from "@/components/dashboard/constants";
import LoadingCard from "@/components/dashboard/loadingCard";
import Hero from "@/components/hero";
import { config } from "@/config";

const HeroParallax = dynamic(() => import("@/components/heroParallax"));

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
      <section className="">
        <Suspense fallback={<LoadingCard />}>
          <HeroParallax products={DEMOS} />
        </Suspense>
      </section>
    </>
  );
};

export default HomePage;
