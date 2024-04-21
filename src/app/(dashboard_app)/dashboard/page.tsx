import { permanentRedirect, redirect } from "next/navigation";

import { authOptions } from "@/components/auth/constants";

import getSessionUser from "@/lib/getSessionUser";

const DashboardPage = async () => {
  const user = await getSessionUser();
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }
  permanentRedirect("/home");
};

export default DashboardPage;
