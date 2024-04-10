"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { isApexDomain } from "@/lib/validators/domains";
import { verifyDomainRecord } from "@/lib/validators/domains/dns";

const addCustomDomain = async (domain: string, siteId: string) => {
  const data = await prisma.site.update({
    where: {
      id: siteId,
    },
    data: {
      customDomain: domain,
    },
    select: {
      customDomain: true,
      updatedAt: true,
    },
  });
  revalidatePath(`/(dashboard_site)/site/[siteId]`, "layout");
  return data;
};

const deleteCustomDomain = async (siteId: string) => {
  const data = await prisma.site.update({
    where: {
      id: siteId,
    },
    data: {
      customDomain: null,
    },
    select: {
      updatedAt: true,
    },
  });
  revalidatePath(`/(dashboard_site)/site/[siteId]`, "layout");
  return data;
};

const domainVerification = async (
  domain: string
): Promise<{
  message: string;
  domain?: string;
  expectedValue?: string;
  recordType?: string;
  verified?: boolean;
}> => {
  const apexDomainData = isApexDomain(domain);
  if (!apexDomainData) {
    return {
      message: "Invalid domain",
    };
  }
  const { recordType, expectedValue } = apexDomainData;
  const isValidDnsRecord = await verifyDomainRecord(
    domain,
    expectedValue,
    recordType
  );
  if (!isValidDnsRecord) {
    return {
      message: "Invalid DNS record",
      domain: domain,
      expectedValue: expectedValue,
      recordType: recordType,
      verified: false,
    };
  }
  return {
    message: "Domain verified",
    domain: domain,
    expectedValue: expectedValue,
    recordType: recordType,
    verified: true,
  };
};

export { addCustomDomain, domainVerification, deleteCustomDomain };
