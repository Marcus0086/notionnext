import dynamic from "next/dynamic";
import { Suspense } from "react";

const Editor = dynamic(() => import("@/components/dashboard/editor"));
import UpgradePlanCard from "@/components/dashboard/upgradePlanCard";
import LoadingCard from "@/components/dashboard/loadingCard";

export const metadata = {
  title: "Code Settings",
  description: "Update your code settings.",
};

const CodeSettings = () => {
  return (
    <>
      <UpgradePlanCard type={"code"} />
      <Suspense fallback={<LoadingCard />}>
        <Editor />
      </Suspense>
    </>
  );
};

export default CodeSettings;
