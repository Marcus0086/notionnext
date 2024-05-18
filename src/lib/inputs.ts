import { CardInputs, ToggleInputs } from "@/types/component-types";

const isCardInput = (type: string): type is CardInputs => {
  return [
    "text",
    "url",
    "font",
    "media",
    "visibility",
    "delete",
    "opentext",
    "textarea",
    "listadd",
    "linksadd",
    "navtype",
    "footertype",
    "footernote",
    "footertitle",
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
    "footerdivider",
  ].includes(type);
};

export { isCardInput, isToggleInput };
