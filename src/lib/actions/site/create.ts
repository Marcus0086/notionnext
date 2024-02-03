import { parsePageId } from "notion-utils";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import getSessionUser from "@/lib/getSession";
import prisma from "@/lib/prisma";

const createSite = async (formData: FormData) => {
  const sitename = formData.get("sitename") as string;
  const name = sitename.toLocaleLowerCase();
  const rootNotionPageId = formData.get("url") as string;
  const uuidRootNotionPageId = parsePageId(rootNotionPageId, {
    uuid: false,
  });
  try {
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
          error:
            "You have reached the maximum number of sites allowed in your plan",
        };
      }
    } else if (accountType === "PRO") {
      if (siteCount >= 4) {
        return {
          error:
            "You have reached the maximum number of sites allowed in your plan",
        };
      }
    }

    const data = await prisma?.site.create({
      data: {
        name: name,
        subDomain: name,
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
    }
    return {
      error: "Something went wrong",
    };
  }
};

export { createSite };
