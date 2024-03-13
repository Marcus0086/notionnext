"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
