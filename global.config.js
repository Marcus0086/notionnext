const COMAPNY_NAME = process.env.COMAPNY_NAME || "Wisit";

export const config = {
  SERVER_IP: process.env.SERVER_IP || "localhost",
  SERVER_DOMAIN: process.env.SERVER_DOMAIN || "cname.localhost",
  ADMIN_MAIL: process.env.ADMIN_MAIL || "guptamarcus42@gmail.com",
  COMAPNY_NAME: COMAPNY_NAME,
  COMAPNY_NAME_SHORT: process.env.COMAPNY_NAME_SHORT || "Ws",
  META_DATA: {
    HOME_PAGE: {
      TITLE: COMAPNY_NAME + " | Craft Beautiful Websites Today With Notion",
      DESCRIPTION:
        "Keep using Notion, your preferred CMS, while we handle everything else—effortlessly transforming your vision into reality.",
    },
    PRICING_PAGE: {
      TITLE: COMAPNY_NAME + " | Pricing",
      DESCRIPTION:
        "Choose the plan that best suits your needs. Start building your dream website today.",
    },
  },
  FAQ_DATA: [
    {
      question: `How does ${COMAPNY_NAME} works?`,
      answer: `${COMAPNY_NAME} transforms your Notion pages into fully-fledged, high-performance websites with rapid loading times and excellent SEO capabilities. Simply manage your content on Notion, and watch as our platform effortlessly brings your website to life.`,
    },
    {
      question: `How to create a website with ${COMAPNY_NAME}?`,
      answer: `Building your website with ${COMAPNY_NAME} is streamlined and intuitive. Simply enter the URL of your Notion page into our platform, and we'll instantly sync all related subpages, constructing your site in moments. Next, personalize your site by adding logos, choosing custom color schemes, and linking your unique domain. In just a few minutes, your site will be set to launch.`,
    },
    {
      question: `How does ${COMAPNY_NAME} make website management easy?`,
      answer: `Our platform handles the complexities of web development so you don't have to. From automating the build process to ensuring your website's design is top-notch, ${COMAPNY_NAME} makes the entire process feel seamless and, frankly, a bit magical.`,
    },
    {
      question: `Can I personalize my website's look with ${COMAPNY_NAME}?`,
      answer: `Absolutely! While we provide the foundation, you have the creative freedom to customize your site's aesthetics. Tailor your website's appearance to match your brand's personality with our easy-to-use design tools.`,
    },
    {
      question: "How do I connect a custom domain to my website?",
      answer: `Connecting your own domain is a breeze with ${COMAPNY_NAME}. Our intuitive dashboard allows you to link your custom domain, giving your website a personal touch and making it easy for visitors to find you online.`,
    },
  ],
};
