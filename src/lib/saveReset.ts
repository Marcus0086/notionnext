import { SiteSettings } from "@/types";

const generateLogMessage = (updatedData: any) => {
  const changes = [
    {
      field: "visibility",
      message: `Changed visibility to ${updatedData?.visibility}`,
    },
    { field: "name", message: `Changed name to ${updatedData?.name}` },
    {
      field: "description",
      message: `Changed description to ${updatedData?.description?.slice(
        0,
        100
      )}`,
    },
    { field: "css", message: "Changed css" },
    { field: "html", message: "Changed html" },
    { field: "javascript", message: "Changed javascript" },
    {
      field: "fontFamily",
      message: `Changed fontFamily to ${updatedData?.fontFamily}`,
    },
    {
      field: "isSearchEnabled",
      message: `Changed isSearchEnabled to ${updatedData?.isSearchEnabled}`,
    },
    {
      field: "isAiSearchEnabled",
      message: `Changed isAiSearchEnabled to ${updatedData?.isAiSearchEnabled}`,
    },
    {
      field: "isDarkModeEnabled",
      message: `Changed isDarkModeEnabled to ${updatedData?.isDarkModeEnabled}`,
    },
    {
      field: "isTweetEmbedSupportEnabled",
      message: `Changed isTweetEmbedSupportEnabled to ${updatedData?.isTweetEmbedSupportEnabled}`,
    },
    {
      field: "isPreviewImageSupportEnabled",
      message: `Changed isPreviewImageSupportEnabled to ${updatedData?.isPreviewImageSupportEnabled}`,
    },
    {
      field: "isTopLoadingBarEnabled",
      message: `Changed isTopLoadingBarEnabled to ${updatedData?.isTopLoadingBarEnabled}`,
    },
    {
      field: "includeNotionIdInUrls",
      message: `Changed includeNotionIdInUrls to ${updatedData?.includeNotionIdInUrls}`,
    },
  ];

  for (const change of changes) {
    if (updatedData?.[change.field] !== undefined) {
      return change.message;
    }
  }

  return "Updated site successfully";
};

const getUpdatedData = (
  settings: SiteSettings,
  savedUris: Record<string, string>
) => {
  const updatedData: any = {};
  if (settings?.miscelanous?.visibility) {
    updatedData.visibility = settings.miscelanous.visibility;
  }

  if (typeof settings?.miscelanous?.css === "string") {
    updatedData.css = savedUris["css"];
  }

  if (typeof settings?.miscelanous?.html === "string") {
    updatedData.html = savedUris["html"];
  }

  if (typeof settings?.miscelanous?.javascript === "string") {
    updatedData.javascript = savedUris["javascript"];
  }

  if (settings?.miscelanous?.fontFamily) {
    updatedData.fontFamily = settings.miscelanous.fontFamily;
  }

  if (settings?.miscelanous?.name) {
    updatedData.name = settings.miscelanous.name;
    updatedData.subDomain = settings.miscelanous.name;
  }

  if (typeof settings?.miscelanous?.description === "string") {
    updatedData.description = settings.miscelanous.description;
  }

  if (typeof settings?.miscelanous?.main_title_size === "string") {
    if (!updatedData["siteConfig"]) {
      updatedData["siteConfig"] = {};
    }
    updatedData["siteConfig"]["main_title_size"] =
      settings.miscelanous.main_title_size;
  }

  if (typeof settings?.miscelanous?.main_text_size === "string") {
    if (!updatedData["siteConfig"]) {
      updatedData["siteConfig"] = {};
    }
    updatedData["siteConfig"]["main_text_size"] =
      settings.miscelanous.main_text_size;
  }

  const miscelanousSettings = [
    "isSearchEnabled",
    "isAiSearchEnabled",
    "isDarkModeEnabled",
    "isTweetEmbedSupportEnabled",
    "isPreviewImageSupportEnabled",
    "isTopLoadingBarEnabled",
    "includeNotionIdInUrls",
    "isSiteMapEnabled",
    "isIndexingEnabled",
    "navigationStyle",
    "footerStyle",
    "footer_footnote",
    "footer_title",
    "footer_divider",
  ];

  const colorKeys = [
    "main_bg",
    "main_bg_dark",
    "navbar_bg",
    "navbar_bg_dark",
    "footer_bg",
    "footer_bg_dark",
    "main_text_color",
    "main_text_color_dark",
    "navbar_text_color",
    "navbar_text_color_dark",
    "footer_text_color",
    "footer_text_color_dark",
  ];

  miscelanousSettings.forEach((setting) => {
    if (settings?.miscelanous?.[setting] !== undefined) {
      if (!updatedData["siteConfig"]) {
        updatedData["siteConfig"] = {};
      }
      updatedData["siteConfig"][setting] = settings.miscelanous[setting];
    }
  });

  colorKeys.forEach((colorKey) => {
    const color = settings?.miscelanous?.[colorKey];
    if (typeof color === "string") {
      if (!updatedData["siteConfig"]) {
        updatedData["siteConfig"] = {};
      }
      updatedData["siteConfig"][colorKey] = color;
    }
  });

  return updatedData;
};

const getResetGeneralSettings = (
  currentSettings: SiteSettings,
  generalMiscelanousSettings?: Record<string, string | boolean>
) => {
  if (!generalMiscelanousSettings) return;
  if (currentSettings.site?.name !== generalMiscelanousSettings?.name) {
    delete generalMiscelanousSettings.name;
  }
  if (
    currentSettings?.site?.visibility !== generalMiscelanousSettings?.visibility
  ) {
    delete generalMiscelanousSettings.visibility;
  }
  return generalMiscelanousSettings;
};

const getResetDesignSettings = (
  designMiscelanousSettings?: Record<string, string | boolean>
) => {
  if (!designMiscelanousSettings) return;
  const miscelanousSettingsKeys = [
    "css",
    "fontFamily",
    "main_bg",
    "navbar_bg",
    "footer_bg",
    "main_text_color",
    "navbar_text_color",
    "footer_text_color",
    "main_bg_dark",
    "navbar_bg_dark",
    "footer_bg_dark",
    "main_text_color_dark",
    "navbar_text_color_dark",
    "footer_text_color_dark",
  ];
  miscelanousSettingsKeys.forEach((key) => {
    delete designMiscelanousSettings[key];
  });
  return designMiscelanousSettings;
};

const getResetSeoSettings = (
  seoMiscelanousSettings?: Record<string, string | boolean>
) => {
  if (!seoMiscelanousSettings) return;
  const seoKeys = ["description", "isIndexingEnabled", "isSiteMapEnabled"];
  seoKeys.forEach((key) => {
    delete seoMiscelanousSettings[key];
  });
  return seoMiscelanousSettings;
};

export {
  generateLogMessage,
  getUpdatedData,
  getResetGeneralSettings,
  getResetDesignSettings,
  getResetSeoSettings,
};
