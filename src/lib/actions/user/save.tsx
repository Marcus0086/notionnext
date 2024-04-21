"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { config } from "@/config";

const ADMIN_MAIL = config.ADMIN_MAIL;
const updateUser = async (userData: {
  id: string;
  username: string;
  email: string;
}) => {
  try {
    const data = await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: {
        name: userData.username,
        email: userData.email,
        role: userData.email === ADMIN_MAIL ? "ADMIN" : "USER",
        accountType: userData.email === ADMIN_MAIL ? "ENTERPRISE" : "FREE",
      },
      select: {
        id: true,
      },
    });
    revalidatePath("/settings");
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { updateUser };
