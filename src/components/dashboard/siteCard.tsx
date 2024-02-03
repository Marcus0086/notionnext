import Image from "next/image";
import Link from "next/link";
import { TbExternalLink } from "react-icons/tb";

import SiteCardImage from "@/components/dashboard/siteCardImage";
import MoreIcon from "@/components/dashboard/moreIcon";

import { cn } from "@/lib/utils";
import { domainSuffix, httpPrefix } from "@/lib/config";

import { SiteCard } from "@/types";
import { VisibilityFilter } from "@prisma/client";

const SiteCard = ({
  id,
  image,
  name,
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
  const [bg, border] =
    visibility === VisibilityFilter.LIVE
      ? ["bg-green-400", "border-green-400"]
      : visibility === VisibilityFilter.DRAFT
      ? ["bg-yellow-400", "border-yellow-400"]
      : ["bg-red-400", "border-red-400"];
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
          <SiteCardImage imageUrl={image} name={name || ""} />
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
            "px-4 py-2 rounded-3xl flex items-center justify-center gap-x-2",
            border,
            "border border-solid"
          )}
        >
          <div className={cn("rounded-full w-[6px] h-[6px]", bg)} />
          <h6 className="text-cloudBurst dark:text-white capitalize text-base">
            {visibility?.toLocaleLowerCase() || ""}
          </h6>
        </div>
      </div>
    </li>
  );
};

export default SiteCard;
