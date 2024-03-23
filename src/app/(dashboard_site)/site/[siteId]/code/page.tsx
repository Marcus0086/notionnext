import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/dashboard/editor"));
import UpgradePlanCard from "@/components/dashboard/upgradePlanCard";

const CodeSettings = () => {
  return (
    <>
      <UpgradePlanCard />
      <Editor />
    </>
  );
};

export default CodeSettings;
