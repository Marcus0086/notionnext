"use server";

import { cache } from "react";
import getSessionUser from "@/lib/getSession";

const createUser = async (formData: FormData) => {
  const userEmail = formData.get("user_email");
  const userPassword = formData.get("user_password");
  const isKeepLogin = formData.get("user_remember_me");
  console.log("Create User form data:", {
    userEmail,
    userPassword,
    isKeepLogin,
  });
};

const getUserAccount = cache(async () => {
  try {
    const user = await getSessionUser();
    return user?.accountType || null;
  } catch (error) {
    console.log("[Site] error happended in getUserAccount", error);
    return null;
  }
});

export { createUser, getUserAccount };
