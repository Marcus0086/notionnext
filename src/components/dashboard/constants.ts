import { domainSuffix } from "@/lib/config";
import {
  AsideMenuType,
  CardInputs,
  DesignSettingsDropDownType,
  ToggleInputs,
} from "@/types";

const META_DATA = {
  dashBoard: {
    title: "Dashboard",
    description: "Dashboard",
  },
  homePage: {
    title: "HomePage",
    description: "Welcome to nextnotion",
  },
};

const ASIDE_MENU: AsideMenuType[] = [
  {
    title: "Sites",
    icon: "home",
    isDefault: true,
    link: "/home",
  },
  {
    title: "Account",
    icon: "account",
    isDefault: false,
    link: "/account",
  },
  {
    title: "Settings",
    icon: "settings",
    isDefault: false,
    link: "/settings",
  },
  {
    title: "Support",
    icon: "help",
    isDefault: false,
    link: "/help",
  },
];

const SETTINGS_ASIDE_MENU: AsideMenuType[] = [
  {
    title: "General",
    icon: "settings",
    isDefault: true,
    link: "",
  },
  {
    title: "Design",
    icon: "design",
    isDefault: false,
    link: "/design",
  },
  {
    title: "Seo",
    icon: "seo",
    isDefault: false,
    link: "/seo",
  },
  {
    title: "Code",
    icon: "code",
    isDefault: false,
    link: "/code",
  },
  {
    title: "Domains",
    icon: "globe",
    isDefault: false,
    link: "/domains",
  },
  {
    title: "AI",
    icon: "AI",
    isDefault: false,
    link: "/ai",
  },
  {
    title: "Options",
    icon: "options",
    isDefault: false,
    link: "/options",
  },
  {
    title: "NavBar",
    icon: "nav",
    isDefault: false,
    link: "/nav",
  },
  {
    title: "Footer",
    icon: "footer",
    isDefault: false,
    link: "/footer",
  },
];

const FILTERS = ["Live", "Draft", "Archived"];

const FILES = [
  {
    path: "index.css",
    defaultLanguage: "css",
    content: "/* <style> */ \n",
  },
  {
    path: "index.html",
    defaultLanguage: "html",
    content: "<!-- <head> --> \n",
  },
  {
    path: "index.js",
    defaultLanguage: "javascript",
    content: "// <script> \n",
  },
];

const PALETTE: {
  background?: string;
  css?: string;
  name: string;
  type: "light" | "dark" | "custom";
  placeholder?: string;
}[] = [
  {
    background: "#fff",
    name: "Default Light",
    type: "light",
  },
  {
    background: "linear-gradient(to right, #ffefba, #ffffff)",
    name: "Margo",
    type: "light",
  },
  {
    background: "linear-gradient(to right, #2980b9, #6dd5fa, #ffffff)",
    name: "Cool Sky",
    type: "light",
  },
  {
    background: "linear-gradient(to right, #d3cce3, #e9e4f0)",
    name: "Delicate",
    type: "light",
  },
  {
    background: "linear-gradient(to right, #ada996, #f2f2f2, #dbdbdb, #eaeaea)",
    name: "Zinc",
    type: "light",
  },
  {
    background: "linear-gradient(to right, #c9d6ff, #e2e2e2)",
    name: "Dull",
    type: "light",
  },
  {
    background: "linear-gradient(to right, #d9a7c7, #fffcdc)",
    name: "Candy",
    type: "light",
  },
  {
    background: "#2f3437",
    name: "Default Dark",
    type: "dark",
  },
  {
    background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
    name: "Lawrencium",
    type: "dark",
  },
  {
    background: "linear-gradient(to right, #ad5389, #3c1053)",
    name: "eXpresso",
    type: "dark",
  },
  {
    background: "linear-gradient(to right, #03001e, #7303c0, #ec38bc, #fdeff9)",
    name: "Argon",
    type: "dark",
  },
  {
    background: "linear-gradient(to right, #41295a, #2f0743)",
    name: "80's Purple",
    type: "dark",
  },
  {
    background: "linear-gradient(to right, #000428, #004e92)",
    name: "Frost",
    type: "dark",
  },
];

type Settings<T extends CardInputs | ToggleInputs> = {
  title: string;
  type: T;
  description: string;
  toolTip?: string;
}[];

const GENERAL_SETTINGS: Settings<CardInputs> = [
  {
    title: "Site Name",
    type: "opentext",
    description: "The subdomain/title of your site",
  },
  {
    title: "Notion Page",
    type: "url",
    description: "Source of your site.",
  },
  {
    title: "Site Visibility",
    type: "visibility",
    description: "Set visibility of your site",
    toolTip: "Change to Live to make your site public.",
  },
  {
    title: "Delete Site",
    type: "delete",
    description: "Delete your site",
  },
];

const DESIGN_SETTINGS: Settings<CardInputs> = [
  {
    title: "Site Font",
    type: "font",
    description: "Set font for your site",
  },
];

const DESIGN_SETTINGS_DROP_DOWN: DesignSettingsDropDownType[] = [
  {
    title: "Navbar",
    componentItems: [
      {
        name: "Background",
        id: "navbar_bg",
        type: "Color",
      },
      {
        name: "Text",
        id: "navbar_text_color",
        type: "Color",
      },
    ],
  },
  {
    title: "Main",
    componentItems: [
      {
        name: "Background",
        id: "main_bg",
        type: "Color",
      },
      {
        name: "Text",
        id: "main_text_color",
        type: "Color",
      },
      {
        name: "Base Font Size",
        id: "main_text_size",
        type: "Font",
      },
      {
        name: "Title Font Size",
        id: "main_title_size",
        type: "Font",
      },
    ],
  },
  {
    title: "Footer",
    componentItems: [
      {
        name: "Background",
        id: "footer_bg",
        type: "Color",
      },
      {
        name: "Text",
        id: "footer_text_color",
        type: "Color",
      },
    ],
  },
];

const SEO_SETTINGS: Settings<CardInputs | ToggleInputs> = [
  {
    title: "Enable SiteMaps",
    description: "Enable public sitemaps for your site",
    type: "sitemap",
  },
  {
    title: "Site Title",
    type: "text",
    description: "The meta title of your site",
    toolTip: "Change the title from the notion page, to update this field",
  },
  {
    title: "Site Description",
    type: "textarea",
    description: "The meta description of your site",
  },
];

const OPTIONS_SETTINGS: Settings<ToggleInputs> = [
  {
    title: "Theme Toggle",
    description: "Toggle between light and dark mode",
    type: "theme",
  },
  // {
  //     title: 'Enable Search',
  //     description: 'Search through your links or whole site',
  //     type: 'search'
  // },
  {
    title: "AI Chat",
    description: "Enable AI chat for your site",
    type: "ai",
  },
  {
    title: "Twitter embeds",
    description: "Enable twitter card embeds for your site",
    type: "twitter",
  },
  {
    title: "Top Loader",
    description: "Enable a top loader for your site",
    type: "toploader",
  },
];

const DOMAIN_SETTINGS: Settings<CardInputs> = [
  {
    title: "Sub Domain",
    type: "opentext",
    toolTip: `Your site's subdomain ending with ${domainSuffix}`,
    description: "The sub domain of your site",
  },
  {
    title: "Custom Domain",
    type: "listadd",
    description: "Add a custom domain to your site",
  },
];

const GOOGLE_FONTS = ["Poppins", "Roboto", "Open Sans", "Lato", "Raleway"];

const ALERT_MESSAGES = {
  DeleteSite: {
    title: "Are you sure you want to delete this site?",
    description:
      "This action cannot be undone and will delete the site from our servers.",
  },
};

const DEFAULT_FONT = `ui-sans-serif, system-ui, apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol'`;

const SIDEBAR_NAV_ITEMS = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "Display",
    href: "/settings/display",
  },
];

const SIDEBAR_NAV_ACCOUNT_ITEMS = [
  {
    title: "Preferences",
    href: "/account",
  },
  {
    title: "Subscription",
    href: "/account/subscription",
  },
];

const TESTIMONIALS = [
  {
    href: "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
    alt: "Moonbeam",
  },
  {
    href: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    alt: "Moonbeam",
  },
  {
    href: "https://aceternity.com/images/products/thumbnails/new/rogue.png",
    alt: "Moonbeam",
  },
  {
    href: "https://aceternity.com/images/products/thumbnails/new/editorially.png",
    alt: "Moonbeam",
  },
  {
    href: "https://aceternity.com/images/products/thumbnails/new/editrix.png",
    alt: "Moonbeam",
  },
  {
    href: "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
    alt: "Moonbeam",
  },
];

const DEMOS = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

const PLANS = [
  {
    title: "Hobby",
    price: "$0",
    validity: "30 days",
    description: "Get a glimpse of what you can do with Notionnext",
    features: [
      {
        title: "Free hosting on notionnext domains",
        info: "Create up to four custom sites with notionnext domains",
      },
      {
        title: "Unlimited Customization",
        info: "Customize your site with custom themes, fonts, and custom css",
      },
      {
        title: "Marked with Powered by Notionnext badge",
        info: "Your site will be marked with `Powered by Notionnext` badge",
      },
    ],
  },
  {
    title: "Pro",
    price: "$10",
    description: "Everything in Hobby plus",
    features: [
      {
        title: "Custom Domain",
        info: "Connect your existing custom domain",
      },
      {
        title: "Custom Code",
        info: "Add custom javscript to your site",
      },
      {
        title: "Automatic SSL",
        info: "Get automatic SSL for your custom domain",
      },
      {
        title: "Manual publishing with previews",
        info: "Publish your site manually to have more control over the content",
      },
      {
        title: "CDN cached sites",
        info: "Your site will be cached on our CDN for faster load times",
      },
      {
        title: "Optimized for SEO",
        info: "Get your site optimized for search engines (sitemap, robots, rss)",
      },
      {
        title: "No Notionnext badge",
        info: "Your site will be free of `Powered by Notionnext` badge",
      },
      {
        title: "Customer Support",
        info: "Get help from our team of experts on email and chat",
      },
    ],
  },
  {
    title: "Business",
    price: "$50",
    description: "Everything in Pro plus",
    contactSales: true,
    features: [
      {
        title: "Priority Support",
        info: "Get priority support from our team of experts",
      },
      {
        title: "Custom Built Sites",
        info: "Get a custom built site from our team of experts",
      },
      {
        title: "Custom Built Themes",
        info: "Get a custom built theme from our team of experts",
      },
      {
        title: "Access to beta features",
        info: "Get early access to new features and updates",
      },
    ],
  },
];

export {
  META_DATA,
  ASIDE_MENU,
  FILTERS,
  SETTINGS_ASIDE_MENU,
  FILES,
  PALETTE,
  ALERT_MESSAGES,
  DEFAULT_FONT,
  DESIGN_SETTINGS,
  GENERAL_SETTINGS,
  GOOGLE_FONTS,
  OPTIONS_SETTINGS,
  SEO_SETTINGS,
  SIDEBAR_NAV_ITEMS,
  SIDEBAR_NAV_ACCOUNT_ITEMS,
  DESIGN_SETTINGS_DROP_DOWN,
  DEMOS,
  TESTIMONIALS,
  PLANS,
  DOMAIN_SETTINGS,
};
