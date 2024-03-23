import { notFound } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import ProfileForm from "@/components/dashboard/profileForm";

import getSessionUser from "@/lib/getSessionUser";

const SettingsProfilePage = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    notFound();
  }
  const user = {
    id: sessionUser.id,
    name: sessionUser.name || undefined,
    username: sessionUser.username || undefined,
    email: sessionUser.email || undefined,
  };
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Your account information
        </p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  );
};

export default SettingsProfilePage;
