import { Suspense } from "react";
import dynamic from "next/dynamic";

import { DEMOS } from "@/components/dashboard/constants";
import LoadingCard from "@/components/dashboard/loadingCard";
import Hero from "@/components/hero";
import Pricing from "@/components/pricing";
const HeroParallax = dynamic(() => import("@/components/heroParallax"));

const HomePage = () => {
  return (
    <>
      <Hero />
      <section>
        <Suspense fallback={<LoadingCard />}>
          <HeroParallax products={DEMOS} />
        </Suspense>
      </section>
      <Pricing />
    </>
  );
};

export default HomePage;
