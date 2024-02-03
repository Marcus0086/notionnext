export type NavigationStyle = "default" | "custom";

export interface NavigationLink {
  title: string;
  pageId?: string;
  url?: string;
}
