import Image from "next/image";
import Link from "next/link";
import { TbExternalLink } from "react-icons/tb";

import MoreIcon from "@/components/dashboard/moreIcon";
import { EvervaultCard } from "@/components/ui/everVaultCard";

import { cn } from "@/lib/utils";
import { domainSuffix, httpPrefix } from "@/lib/config";

import type { SiteCard } from "@/types";
import { VisibilityFilter } from "@prisma/client";
import SiteCardImage from "./siteCardImage";

const SiteCard = ({
  id,
  name,
  image,
  visibility,
  siteConfig,
  user,
  delete: deleteButton = true,
  settings,
}: Partial<
  SiteCard & {
    delete: boolean;
    settings: boolean;
  }
>) => {
  const [bg, border, text] =
    visibility === VisibilityFilter.LIVE
      ? ["bg-green-400", "border-green-400", "text-green-400"]
      : visibility === VisibilityFilter.DRAFT
      ? ["bg-yellow-400", "border-yellow-400", "text-yellow-400"]
      : ["bg-red-400", "border-red-400", "text-red-400"];
  return (
    <li
      className={cn(
        settings ? "" : "hover:scale-[1.02]",
        settings ? "w-full" : "w-11/12",
        "rounded-[20px] bg-white dark:bg-navy-800 shadow transition duration-200 ease-in-out",
        "hover:shadow-xl px-4 py-4",
        "flex flex-col items-start justify-between gap-y-3 font-normal mx-auto"
      )}
    >
      {!settings && (
        <Link href={`/site/${id}`} className="relative h-48 w-full">
          {image ? (
            <SiteCardImage imageUrl={image} name={name || "Card Image"} />
          ) : (
            <div className="h-full overflow-hidden relative rounded-xl border border-selago dark:border-blueZodiac object-cover">
              <div className="absolute inset-0 w-full h-full">
                <EvervaultCard text={name || ""} />
              </div>
            </div>
          )}
        </Link>
      )}

      <div className="flex items-center justify-between w-full">
        <h3
          className={cn(
            "text-cloudBurst dark:text-white capitalize",
            settings ? "text-2xl font-semibold" : "text-base font-normal"
          )}
        >
          {name || ""}
        </h3>
        {user?.image && (
          <Image
            src={user.image}
            alt="User Image"
            width={28}
            height={28}
            className="rounded-full"
          />
        )}
      </div>
      {siteConfig?.author && (
        <h6 className="text-rockBlue text-xs">By {siteConfig.author}</h6>
      )}
      <div className="flex items-center justify-between w-full">
        {deleteButton && <MoreIcon siteId={id || ""} />}
        {settings && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${httpPrefix}${name?.toString()}.${domainSuffix}`}
          >
            <TbExternalLink className="w-6 h-6 text-gray-700" />
          </a>
        )}
        <div
          className={cn(
            "px-2 py-1 rounded-3xl flex items-center justify-center gap-x-1",
            border,
            "border border-solid"
          )}
        >
          <div className={cn("rounded-full w-1 h-1", bg)} />
          <h6 className={cn("capitalize text-xs", text)}>
            {visibility?.toLocaleLowerCase() || ""}
          </h6>
        </div>
      </div>
    </li>
  );
};

export default SiteCard;
