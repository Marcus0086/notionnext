import { notFound } from "next/navigation";
import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import AccountForm from "@/components/dashboard/accountForm";

import getSessionUser from "@/lib/getSessionUser";
import { getUserWithAccounts } from "@/lib/actions/user/account/get";

export const metadata: Metadata = {
  title: "Account | Dashboard",
  description: "Add private page access or change your subscription.",
};

const SettingsAccountPage = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    notFound();
  }
  const userWithAccounts = await getUserWithAccounts(sessionUser.id);
  if (!userWithAccounts) {
    notFound();
  }
  return (
    <div className="space-y-6 lg:max-w-2xl">
      <div>
        <p className="text-lg font-medium">Enable Private Page Access.</p>
      </div>
      <Separator />
      <AccountForm userWithAccounts={userWithAccounts} />
    </div>
  );
};

export default SettingsAccountPage;
