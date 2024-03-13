"use server";

import prisma from "@/lib/prisma";

const getUserWithAccounts = async (userId: string) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        accounts: true,
      },
    });
    return data;
  } catch (error) {
    console.error("[User] error happended in getUserAccount", error);
    return null;
  }
};

export { getUserWithAccounts };
