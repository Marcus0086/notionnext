import dynamic from "next/dynamic";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";

import HomePageNavBar from "@/components/homePageNavBar";
import LoadingCard from "@/components/dashboard/loadingCard";
import Footer from "@/components/footer";
import Faqs from "@/components/faqs";
import StartFreeDemo from "@/components/startDemoFold";
const FeatureGrid = dynamic(() => import("@/components/featureGrid"));

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NextTopLoader showSpinner={false} />
      <main className="overflow-hidden bg-neutral-950">
        <HomePageNavBar />
        {children}
        <Suspense fallback={<LoadingCard />}>
          <FeatureGrid />
        </Suspense>
        <Faqs />
        <StartFreeDemo />
        <Footer />
      </main>
    </>
  );
}
