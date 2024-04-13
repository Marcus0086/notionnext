import { CardInputs, ToggleInputs } from "@/types/component-types";

const isCardInput = (type: string): type is CardInputs => {
  return [
    "text",
    "opentext",
    "textarea",
    "font",
    "media",
    "url",
    "visibility",
    "delete",
  ].includes(type);
};

const isToggleInput = (type: string): type is ToggleInputs => {
  return [
    "theme",
    "search",
    "ai",
    "preview",
    "twitter",
    "toploader",
    "prettyurls",
    "sitemap",
    "indexing",
  ].includes(type);
};

export { isCardInput, isToggleInput };
