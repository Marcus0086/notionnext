import { CardsInputFactory } from "@/lib/factories/cardInput";

import { CardInputs } from "@/types";
import { VisibilityFilter } from "@prisma/client";

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
      : siteId;
  const Input = CardsInputFactory.getInput(type, value);
  return Input;
};

export default CardInput;
