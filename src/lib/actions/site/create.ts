"use server";

import { parsePageId } from "notion-utils";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import getSessionUser from "@/lib/getSessionUser";
import prisma from "@/lib/prisma";
import { subdomainSchema } from "@/lib/validators/domains";

const takenSubDomains = ["app", "api"];

const createSite = async (formData: FormData) => {
  const sitename = formData.get("sitename") as string;
  const name = sitename.toLocaleLowerCase();
  const rootNotionPageId = formData.get("url") as string;
  const isPrivatePage = formData.get("toggle") === "on";
  const uuidRootNotionPageId = parsePageId(rootNotionPageId, {
    uuid: false,
  });
  try {
    if (takenSubDomains.includes(name)) {
      return {
        error: "This subdomain is reserved",
      };
    }
    await subdomainSchema.parseAsync(name);
    const user = await getSessionUser();
    if (!user) {
      throw new Error("User not found");
    }
    const userId = user?.id || "";
    const userName = user?.name || "";
    const accountType = user?.accountType || "";

    const userSites = await prisma?.site.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
      },
    });
    const siteCount = userSites.length;
    if (accountType === "FREE") {
      if (siteCount >= 1) {
        return {
          error: "Maximum number of sites reached",
          code: "MAX_SITES_REACHED",
        };
      }
    } else if (accountType === "PRO") {
      if (siteCount >= 4) {
        return {
          error: "Maximum number of sites reached",
          code: "MAX_SITES_REACHED",
        };
      }
    }

    const data = await prisma?.site.create({
      data: {
        name: name,
        subDomain: name,
        notionAuthToken: isPrivatePage ? user?.notionAuthToken : undefined,
        notionUserId: isPrivatePage ? user?.notionUserId : undefined,
        user: {
          connect: {
            id: userId,
          },
        },
        siteConfig: {
          create: {
            name: name,
            rootNotionPageId: uuidRootNotionPageId,
            domain: name,
            author: userName,
          },
        },
      },
      select: {
        id: true,
      },
    });
    revalidatePath("/home");
    return {
      id: data?.id || "",
    };
  } catch (error) {
    console.log("[Site] error happended in createSite", error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        error: "Site already exists",
      };
    } else if (error instanceof z.ZodError) {
      return {
        error: error.errors[0].message,
      };
    }

    return {
      error: "Something went wrong",
    };
  }
};

export { createSite };
