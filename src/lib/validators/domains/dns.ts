"use server";

import dns from "dns";
import util from "util";

export type RecordType = "A" | "CNAME";

const dnsLookup = util.promisify(dns.resolve);

const verifyDomainRecord = async (
  domain: string,
  expectedValue: string,
  recordType: RecordType = "A"
) => {
  try {
    const records = await dnsLookup(domain, recordType);
    console.log(`DNS lookup for ${domain} returned:`, records);
    return records.includes(expectedValue);
  } catch (error) {
    console.error(`DNS lookup failed for ${domain} with error: ${error}`);
    return false;
  }
};

export { verifyDomainRecord };
