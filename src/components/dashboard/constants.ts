import { AsideMenuType, CardInputs, ToggleInputs } from "@/types";

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
    title: "Home",
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
    title: "Help",
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
    content: "/* write your css here */ \n",
  },
  {
    path: "index.html",
    defaultLanguage: "html",
    content: "/* write your html here */ \n",
  },
  {
    path: "index.js",
    defaultLanguage: "javascript",
    content: "/* write your js here */ \n",
  },
];

const THEMES: {
  [key: string]: {
    background?: string;
    css?: string;
    name: string;
    type: "light" | "dark" | "custom";
    placeholder?: string;
  }[];
} = {
  Free: [
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
      background:
        "linear-gradient(to right, #ada996, #f2f2f2, #dbdbdb, #eaeaea)",
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
      background:
        "linear-gradient(to right, #03001e, #7303c0, #ec38bc, #fdeff9)",
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
  ],
  Paid: [
    {
      css: ".notion {--notion-max-width: 720px;--notion-header-height: 54px;}.notion-page {padding-bottom: calc(max(5vh, 32px)) !important;line-height: 1.65;}.index-page {--notion-max-width: 900px;}.notion-text {padding: 0.5em 2px;}.notion-asset-caption {text-align: center;}.notion-asset-wrapper {margin-top: 1em;margin-bottom: 1em;}.notion-asset-wrapper-video>div, .notion-asset-wrapper-video video {width: 100% !important;}.notion-header .notion-nav-header {max-width: 1100px;margin: 0 auto;}.notion-nav-header-rhs {gap: 0.5rem;}.notion-gallery-grid {grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));grid-gap: 6vmin;gap: 6vmin;}.notion-gallery-grid .notion-page-icon-inline {display: none;}.notion-gallery-grid .notion-page-title-text {font-size: 2em;white-space: unset;}.notion-gallery-grid .notion-collection-card-property {white-space: unset;text-overflow: unset;}.notion-gallery-grid .notion-property-text {font-size: 14px;}.notion-collection-card {border-radius: 16px;box-shadow: none;}.notion-collection-card-cover img {border-radius: 16px;}.notion-collection-card {overflow: visible;}.notion-collection-card-cover {border-radius: 16px;box-shadow: 2px 2px 8px 4px rgba(15, 15, 15, 0.1);}.notion-collection-card-cover {border-bottom: 0 none;transition: filter 150ms linear;filter: none;}.notion-collection-card:hover .notion-collection-card-cover {filter: brightness(120%);}.notion-collection-card-body {padding: 10px;}@media screen and (-webkit-min-device-pixel-ratio: 0) {_::-webkit-full-page-media, _:future, :root, .notion-collection-card-cover {transition: none 0ms linear;}}.notion-quote {padding: 0.2em 0.75em;line-height: 1.5;font-style: italic;font-size: 1.2em;border-left: 4px solid #67bdfc;}.notion-h1, .notion-h2, .notion-h3 {margin-bottom: 0.25em;}.notion-callout {margin: 0.75em 0;}.notion-hr {margin: 2em 0;}@media only screen and (max-width: 920px) {.index-page.notion-page {padding-left: 2vw;padding-right: 2vw;}}@media only screen and (max-width: 720px) {.notion-page {padding-left: 2vw;padding-right: 2vw;}}@media only screen and (max-width: 600px) {.notion-search-button {display: none !important;}}.notion .notion-page-icon-cover {margin-left: auto;margin-right: auto;}.notion-title {display: block;text-align: center;}.notion-collection-row {padding-bottom: 1em;}.notion-collection-page-properties .notion-collection-column-title {display: none;}.notion-collection-row-property .notion-property {display: flex;justify-content: center;}.notion-collection-row-value {display: flex;align-items: center;padding: 0;min-height: 23px;}.notion-page-cover-wrapper, .notion-page-cover-wrapper span, .notion-page-cover-wrapper img {max-width: 1200px !important;border-radius: 24px;}.notion-page-cover-wrapper {box-shadow: 2px 2px 8px 4px rgba(15, 15, 15, 0.1);}@media only screen and (max-width: 1200px) {.notion-page-cover-wrapper, .notion-page-cover-wrapper span, .notion-page-cover-wrapper img {border-radius: 0;}}.notion-block-ab9a258d6cf444f3bb40dc2600feae91 .notion-page-link {justify-content: center;padding: 2em;}.notion-code {background: rgba(249, 250, 251, 1);border: 1px solid rgba(229, 231, 235, 1);border-radius: 0.375rem;}.notion-link {position: relative;transition: unset;opacity: 1;border-bottom-width: 0.1rem;background: transparent;background-origin: border-box;background-repeat: no-repeat;background-position: 50% 100%;background-size: 0 0.1rem;}.notion-link:focus, .notion-link:hover {border-bottom-color: transparent;background-image: linear-gradient(90.68deg, #b439df 0.26%, #e5337e 102.37%);background-repeat: no-repeat;background-position: 0 100%;background-size: 100% 0.1rem;transition-property: background-position, background-size;transition-duration: 300ms;}.notion-red_background, .notion-pink_background, .notion-blue_background, .notion-purple_background, .notion-teal_background, .notion-yellow_background, .notion-orange_background, .notion-brown_background, .notion-gray_background {padding: 0 0.5rem;margin: 0 -0.5rem 0 -0.25rem;border-radius: 0.5rem;border-bottom-left-radius: 0.125rem;box-decoration-break: clone;background-color: none;background-image: linear-gradient(119deg, var(--bg-color), #fff697 10.5%, #fdf59d 85.29%, var(--bg-color));}.notion-purple_background, .notion-pink_background {background-image: linear-gradient(119deg, var(--bg-color), #f5b8d1 10.5%, #f9bcd3 85.29%, var(--bg-color));}.notion-blue_background, .notion-gray_background {background-image: linear-gradient(119deg, var(--bg-color), #adedfc 10.5%, #adebfd 85.29%, var(--bg-color));}.notion-red_background, .notion-orange_background {background-image: linear-gradient(119deg, var(--bg-color), #f5c4ff 10.5%, #e7a8fc 85.29%, var(--bg-color));}.notion-teal_background {background-image: linear-gradient(119deg, var(--bg-color), #d4eabc 10.5%, #d2eabc 85.29%, var(--bg-color));}.notion-brown_background {background-image: linear-gradient(119deg, var(--bg-color), #96b8ec 10.5%, #a6c3f0 85.29%, var(--bg-color));}.dark-mode .notion-red_background, .dark-mode .notion-pink_background, .dark-mode .notion-blue_background, .dark-mode .notion-purple_background, .dark-mode .notion-teal_background, .dark-mode .notion-yellow_background, .dark-mode .notion-orange_background, .dark-mode .notion-brown_background, .dark-mode .notion-gray_background {padding: 0;margin: 0;border-radius: 0;background: none !important;}.notion-page-icon-hero.notion-page-icon-image {border-radius: 50%;box-shadow: 0 8px 40px 0 rgb(0 0 0 / 21%);}.notion-page-icon-hero.notion-page-icon-image span, .notion-page-icon-hero.notion-page-icon-image img {border-radius: 50%;}.notion-header {background: hsla(0, 0%, 100%, 0.8);backdrop-filter: saturate(180%) blur(16px);}.dark-mode .notion-header {background: transparent;box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);backdrop-filter: saturate(180%) blur(8px);}@-moz-document url-prefix() {.dark-mode .notion-header {background: hsla(203, 8%, 20%, 0.8);}}.notion-bookmark:hover {border-image: linear-gradient(90.68deg, #b439df 0.26%, #e5337e 102.37%);border-image-slice: 1;}.notion-block-ab9a258d6cf444f3bb40dc2600feae91 .notion-column {padding: 0;}.notion-block-260baa77f1e1428b97fb14ac99c7c385 {display: none;}",
      type: "custom",
      name: "Notion Starter Kit",
      placeholder: "/images/dashboard/defaultCard.svg",
    },
  ],
};

type Settings<T extends CardInputs | ToggleInputs> = {
  title: string;
  type: T;
  description: string;
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

const SEO_SETTINGS: Settings<CardInputs> = [
  {
    title: "Site Title",
    type: "text",
    description: "The meta title of your site",
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
export {
  META_DATA,
  ASIDE_MENU,
  FILTERS,
  SETTINGS_ASIDE_MENU,
  FILES,
  THEMES,
  ALERT_MESSAGES,
  DEFAULT_FONT,
  DESIGN_SETTINGS,
  GENERAL_SETTINGS,
  GOOGLE_FONTS,
  OPTIONS_SETTINGS,
  SEO_SETTINGS,
};
