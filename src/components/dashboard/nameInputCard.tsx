import { VisibilityFilter } from "@prisma/client";

import CardInput from "@/components/dashboard/cardInput";

import { cn } from "@/lib/utils";

import { CardInputs } from "@/types";

const NameInputCard = ({
  title,
  description,
  type,
  name,
  url,
  fontFamily,
  visibility,
  siteId,
  siteTitle,
  siteDescription,
}: {
  title: string;
  description?: string;
  visibility?: VisibilityFilter;
} & Partial<{
  name: string;
  type: CardInputs;
  url: string;
  fontFamily: string;
  siteId: string;
  siteTitle: string;
  siteDescription: string;
}>) => {
  return (
    <li
      className={cn(
        "bg-white dark:bg-navy-800 shadow w-full rounded-xl",
        "p-4 flex flex-col items-start justify-between gap-y-3 font-normal"
      )}
    >
      <h3 className="text-cloudBurst dark:text-white text-base">{title}</h3>
      <p className="text-gray-700 text-xs">{description}</p>
      <CardInput
        type={type || "text"}
        name={name}
        url={url}
        font={fontFamily}
        siteId={siteId}
        visibility={visibility || "DRAFT"}
        title={siteTitle}
        description={siteDescription}
      />
    </li>
  );
};

export default NameInputCard;
