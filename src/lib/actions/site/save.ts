"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import zlib from "zlib";
import { v4 as uuidv4 } from "uuid";

import prisma from "@/lib/prisma";
import { getRedisClient } from "@/lib/redis";

import { _SiteData } from "@/types";

const saveSiteData = async (siteId: string, value: any) => {
  let site: {
    id: string;
    subDomain: string | null;
    customDomain: string | null;
  } = { id: "", subDomain: "", customDomain: "" };
  try {
    if (!value?.hasSiteConfigData) {
      site = await prisma.site.update({
        where: {
          id: siteId,
        },
        data: {
          ...value,
        },
        select: {
          id: true,
          subDomain: true,
          customDomain: true,
        },
      });
    } else {
      delete value?.hasSiteConfigData;
      site = await prisma.site.update({
        where: {
          id: siteId,
        },
        data: {
          siteConfig: {
            update: {
              data: {
                ...value,
              },
            },
          },
        },
        select: {
          id: true,
          subDomain: true,
          customDomain: true,
        },
      });
    }
    revalidatePath(`/(site)/site/[siteId]`, "layout");
    return {
      site: site,
    };
  } catch (error) {
    console.log("[Site] error happended in saveSiteData", error);
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

const compressData = async (data: string) => {
  try {
    const buffer = Buffer.from(data, "utf-8");
    const compressed = zlib.brotliCompressSync(buffer);
    return compressed.toString("base64");
  } catch (error) {
    console.error(error);
    return null;
  }
};

const saveFilesInRedis = async (files: Record<string, string>) => {
  const uris: Record<string, string> = {};
  const redisClient = await getRedisClient();
  for (const [key, value] of Object.entries(files)) {
    const uri = key + "_" + uuidv4();
    const compressedData = await compressData(value);
    if (compressedData) {
      await redisClient.set(uri, compressedData);
      uris[key] = uri;
    }
  }
  return uris;
};

export { saveSiteData, saveFilesInRedis };
