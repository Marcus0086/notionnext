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
  // {
  //   path: "index.html",
  //   defaultLanguage: "html",
  //   content: "<!-- <head> --> \n",
  // },
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
      },
      {
        name: "Text",
        id: "navbar_text_color",
      },
    ],
  },
  {
    title: "Main",
    componentItems: [
      {
        name: "Background",
        id: "main_bg",
      },
      {
        name: "Text",
        id: "main_text_color",
      },
    ],
  },
  {
    title: "Footer",
    componentItems: [
      {
        name: "Background",
        id: "footer_bg",
      },
      {
        name: "Text",
        id: "footer_text_color",
      },
    ],
  },
];

const SEO_SETTINGS: Settings<CardInputs> = [
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

  // {
  //     title: 'Site Preview Image',
  //     type: "media",
  //     description: 'The meta preview image of your site',
  // }
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
  // {
  //     title: 'Enable Preview Images',
  //     description: 'Enable preview images for your site',
  //     type: 'preview'
  // },
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
  {
    title: "Enable SiteMaps",
    description: "Enable public sitemaps for your site",
    type: "sitemap",
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
};
