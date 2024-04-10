import { IconType } from "react-icons";

type Display = "mobile" | "tablet" | "desktop";
type RecentHistoryIcons = "create" | "delete" | "update" | "publish";
type Icons =
  | "home"
  | "account"
  | "help"
  | "settings"
  | "design"
  | "theme"
  | "seo"
  | "pages"
  | "options"
  | "nav"
  | "footer"
  | "AI"
  | "code"
  | "globe"
  | Display
  | RecentHistoryIcons;

type AsideMenuType = {
  title: string;
  icon: Icons;
  isDefault: boolean;
  link: string;
};

interface IconFactory {
  getIcon(icon: Icons): IconType;
}

type CardInputs =
  | "text"
  | "opentext"
  | "textarea"
  | "font"
  | "media"
  | "url"
  | "visibility"
  | "delete"
  | "listadd";

type ToggleInputs =
  | "theme"
  | "search"
  | "ai"
  | "preview"
  | "twitter"
  | "toploader"
  | "prettyurls"
  | "sitemap";

type ComponentItem = {
  name: string;
  id: string;
  type: "Color" | "Font";
  color?: string;
};

type DesignSettingsDropDownType = {
  title: string;
  componentItems: ComponentItem[];
};

interface CardInputFactory {
  getInput(type: CardInputs, value?: string): JSX.Element;
}

interface CardInputComponent {
  value?: string;
}

interface ToggleInputFactory {
  getInput(type: ToggleInputs, siteId: string): JSX.Element;
}

type ToggleState = {
  enabled: boolean;
};

type ToggleAction = {
  type: "toggle";
};

type ToggleInputComponent = {
  siteId: string;
};

type Settings = {
  selectedValue?: string;
  siteName?: string;
  deleteValue?: string;
  customDomain?: string;
};

type ActionType =
  | "SET_SELECTED_VALUE"
  | "SET_SETTINGS"
  | "SET_SITE_NAME"
  | "DELETE_SITE"
  | "SET_CUSTOM_DOMAIN";

type SettingsAction = { type: ActionType; payload: string | any };

export type {
  AsideMenuType,
  Icons,
  IconFactory,
  Settings,
  SettingsAction,
  ToggleInputFactory,
  CardInputFactory,
  CardInputs,
  CardInputComponent,
  Display,
  ToggleInputs,
  ToggleAction,
  ToggleState,
  ToggleInputComponent,
  DesignSettingsDropDownType,
};
