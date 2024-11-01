import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import AppearanceForm from "@/components/dashboard/appearanceForm";

export const metadata: Metadata = {
  title: "Appearance | Settings",
  description: "Update your appearance settings.",
};

const SettingsAppearancePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
};

export default SettingsAppearancePage;
