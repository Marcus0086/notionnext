import { Metadata } from "next";

import Pricing from "@/components/pricing";
import { config } from "@/config";

export const metadata: Metadata = {
  title: config.META_DATA.PRICING_PAGE.TITLE,
  description: config.META_DATA.PRICING_PAGE.DESCRIPTION,
  openGraph: {
    title: config.META_DATA.PRICING_PAGE.TITLE,
    description: config.META_DATA.PRICING_PAGE.DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: config.META_DATA.PRICING_PAGE.TITLE,
    description: config.META_DATA.PRICING_PAGE.DESCRIPTION,
  },
};

const PricingPage = () => {
  return <Pricing />;
};

export default PricingPage;
