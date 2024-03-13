"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const updateAccountSettings = async (userData: {
  id: string;
  notionAuthToken?: string;
  notionUserId?: string;
}) => {
  try {
    const data = await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: {
        notionAuthToken: userData.notionAuthToken,
        notionUserId: userData.notionUserId,
      },
      select: {
        id: true,
      },
    });
    revalidatePath("/account");
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { updateAccountSettings };
