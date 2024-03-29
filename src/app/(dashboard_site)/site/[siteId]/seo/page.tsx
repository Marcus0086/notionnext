import { notFound } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { SEO_SETTINGS } from "@/components/dashboard/constants";
const NameInputCard = dynamic(
  () => import("@/components/dashboard/nameInputCard"),
);
import LoadingCard from "@/components/dashboard/loadingCard";

import { cn } from "@/lib/utils";
import { siteImage, sitePage } from "@/lib/actions/site";
import { getSiteMetaData } from "@/lib/siteMetaData";

import { ProviderPageProps } from "@/types";
import { JsonMetaData, SitePageParams } from "@/types";

const SeoSettings = async ({ params: { siteId } }: SitePageParams) => {
  let seoPageData: ProviderPageProps | undefined;
  try {
    seoPageData = await sitePage(siteId, false, true);
    if (!seoPageData) notFound();
  } catch (error) {
    notFound();
  }
  const { title, description, image, icon } = getSiteMetaData(
    seoPageData,
    "json",
  ) as JsonMetaData;
  if (!seoPageData?.site?.image && image && image.length > 0) {
    await siteImage(siteId, image);
  }
  return (
    <>
      <div
        className={cn(
          "bg-white dark:bg-navy-800 shadow w-full rounded-xl",
          "p-4 flex flex-col items-start justify-between gap-y-3 font-normal",
        )}
      >
        <h3 className="text-cloudBurst dark:text-white text-base">Preview</h3>
        <p className="text-gray-700 text-xs">The social preview of your site</p>
        <div className="flex flex-col items-start justify-center w-full gap-y-2 rounded-md border border-selago dark:border-gray-800 p-1">
          <h3 className="flex items-center justify-center gap-x-1 pl-1 text-xs font-medium">
            {icon && icon.length > 0 ? (
              <span>
                <Image
                  unoptimized
                  src={icon}
                  alt="icon"
                  width={16}
                  height={16}
                />
              </span>
            ) : null}
            {title}
          </h3>
          <h3 className="text-[10px] leading-4 font-light pl-1">
            {description || "Description of your site"}
          </h3>
          {image && image.length > 0 ? (
            <div className="relative h-40 w-full">
              <Image
                loading="lazy"
                fill
                src={image}
                alt={title}
                className="rounded-md object-cover"
              />
            </div>
          ) : null}
        </div>
      </div>
      {SEO_SETTINGS.map((card) => (
        <Suspense key={card.title} fallback={<LoadingCard />}>
          <NameInputCard
            {...card}
            type={card.type}
            siteId={siteId}
            name={title}
            siteTitle={title}
            siteDescription={description}
          />
        </Suspense>
      ))}
    </>
  );
};

export default SeoSettings;
