"use server";

import { revalidateTag } from "next/cache";

const revalidateDashboard = async (siteId: string) => {
  revalidateTag(siteId);
};

export { revalidateDashboard };
