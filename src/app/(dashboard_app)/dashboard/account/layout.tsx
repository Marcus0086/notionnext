import { Separator } from "@/components/ui/separator";
import SidebarNav from "@/components/dashboard/sideNavBar";
import { SIDEBAR_NAV_ACCOUNT_ITEMS } from "@/components/dashboard/constants";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <p className="text-muted-foreground text-xl font-semibold">
          Manage your Account Preferences, Subscriptions and Billing.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={SIDEBAR_NAV_ACCOUNT_ITEMS} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
