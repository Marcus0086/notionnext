import getSessionUser from "@/lib/getSession";
import { redirect } from "next/navigation";
import { authOptions } from "@/components/auth/constants";

const DashboardPage = async () => {
  const user = await getSessionUser();
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return <div>Dashboard</div>;
};

export default DashboardPage;
