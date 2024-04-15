import { FooterIconType } from "@prisma/client";

export interface FooterIcon {
  title: string;
  icon: FooterIconType;
  url: string;
}
