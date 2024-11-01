import { z } from "zod";

import { RecordType } from "@/lib/validators/domains/dns";
import { config } from "@/config";

const subdomainSchema = z.string().refine(
  async (value) => {
    if (value.length <= 1 || value.length > 63) return false;

    const subdomainRegex = /^[a-z0-9-]+$/;
    if (!subdomainRegex.test(value)) return false;

    if (value.startsWith("-") || value.endsWith("-")) return false;

    return true;
  },
  {
    message: "Cannot create site with invalid subdomain name",
  },
);

const customDomainSchema = z.string().refine(
  async (value) => {
    if (value.length <= 1 || value.length > 253) return false;
    const customDomainRegex =
      /^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)*\.[a-z]{2,}$/;
    return customDomainRegex.test(value);
  },
  {
    message: "Cannot add invalid custom domain name",
  },
);

const isApexDomain = (
  domain: string,
): {
  recordType: RecordType;
  expectedValue: string;
} => {
  const dotCount = domain.split(".").length - 1;
  if (dotCount === 1) {
    return {
      recordType: "A",
      expectedValue: config.SERVER_IP,
    };
  }
  return {
    recordType: "CNAME",
    expectedValue: config.SERVER_DOMAIN,
  };
};
export { subdomainSchema, customDomainSchema, isApexDomain };
