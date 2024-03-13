import { Separator } from "@/components/ui/separator";
import SidebarNav from "@/components/dashboard/sideNavBar";
import { SIDEBAR_NAV_ITEMS } from "@/components/dashboard/constants";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <p className="text-muted-foreground text-xl font-semibold">
          Manage your profile, appearance, and display settings.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={SIDEBAR_NAV_ITEMS} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;
