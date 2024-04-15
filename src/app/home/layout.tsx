import dynamic from "next/dynamic";
import { Suspense } from "react";

import HomePageNavBar from "@/components/homePageNavBar";
import LoadingCard from "@/components/dashboard/loadingCard";
import Footer from "@/components/footer";
const FeatureGrid = dynamic(() => import("@/components/featureGrid"));

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="overflow-hidden bg-neutral-950">
      <HomePageNavBar />
      {children}
      <Suspense fallback={<LoadingCard />}>
        <FeatureGrid />
      </Suspense>
      <Footer />
    </main>
  );
}
