import { FooterStyle, NavigationStyle, VisibilityFilter } from "@prisma/client";

import { CardsInputFactory } from "@/lib/factories/cardInput";

import { CardInputs } from "@/types";
import { FooterIcon } from "@/types/footer";

const CardInput = ({
  type,
  name,
  url,
  font,
  visibility,
  siteId,
  title,
  description,
  customDomain,
  navigationStyle,
  footerStyle,
  footerFootNote,
  footerTitle,
  footerIcons,
}: {
  type: CardInputs;
  name?: string;
  url?: string;
  font?: string;
  visibility: VisibilityFilter;
  siteId?: string;
  title?: string;
  description?: string;
  customDomain?: string;
  navigationStyle?: NavigationStyle;
  footerStyle?: FooterStyle | null;
  footerFootNote?: string | null;
  footerTitle?: string | null;
  footerIcons?: FooterIcon[];
}) => {
  const value =
    type === "text"
      ? name
      : type === "url"
        ? !url
          ? ""
          : `https://notion.so/${url}`
        : type === "font"
          ? font
          : type === "visibility"
            ? visibility
            : type === "opentext"
              ? title
              : type === "textarea"
                ? description
                : type === "listadd"
                  ? customDomain
                  : type === "navtype"
                    ? (navigationStyle as string)
                    : type === "footertype"
                      ? (footerStyle as string)
                      : type === "footernote"
                        ? footerFootNote
                        : type === "footertitle"
                          ? footerTitle
                          : type === "linksadd"
                            ? footerIcons
                            : siteId;
  const Input = CardsInputFactory.getInput(type, value);
  return Input;
};

export default CardInput;
