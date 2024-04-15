import { FooterStyle, NavigationStyle, VisibilityFilter } from "@prisma/client";
import { MdInfoOutline } from "react-icons/md";

import CardInput from "@/components/dashboard/cardInput";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  toolTip,
  customDomain,
  navigationStyle,
  footerStyle,
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
  toolTip?: string;
  customDomain?: string;
  navigationStyle?: NavigationStyle;
  footerStyle?: FooterStyle;
}>) => {
  return (
    <li
      className={cn(
        "bg-white dark:bg-navy-800 shadow w-full rounded-xl",
        "p-4 flex flex-col items-start justify-between gap-y-3 font-normal"
      )}
    >
      <div className="flex items-center justify-center gap-x-2">
        <h3 className="text-cloudBurst dark:text-white text-base">{title}</h3>
        {toolTip ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <MdInfoOutline />
              </TooltipTrigger>
              <TooltipContent className="bg-white border border-fog drop-shadow-sm">
                <p className="text-gray-800">{toolTip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
      </div>
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
        customDomain={customDomain}
        navigationStyle={navigationStyle}
        footerStyle={footerStyle}
      />
    </li>
  );
};

export default NameInputCard;
