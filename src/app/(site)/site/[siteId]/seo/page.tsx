import { notFound } from "next/navigation";
import Image from "next/image";

import { SEO_SETTINGS } from "@/components/dashboard/constants";
import NameInputCard from "@/components/dashboard/nameInputCard";

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
    "json"
  ) as JsonMetaData;
  if (!seoPageData?.site?.image && image && image.length > 0) {
    await siteImage(siteId, image);
  }
  return (
    <>
      <div
        className={cn(
          "bg-white dark:bg-navy-800 shadow w-full rounded-xl",
          "p-4 flex flex-col items-start justify-between gap-y-3 font-normal"
        )}
      >
        <h3 className="text-cloudBurst dark:text-white text-base">Preview</h3>
        <p className="text-gray-700 text-xs">The social preview of your site</p>
        <div className="flex flex-col items-start justify-center w-full gap-y-2 rounded-md border border-selago dark:border-gray-800 p-1">
          <h3 className="flex items-center justify-center gap-x-1 pl-1 text-xs font-medium">
            <span>
              <Image src={icon} alt="icon" width={16} height={16} />
            </span>
            {title}
          </h3>
          <h3 className="text-[10px] leading-4 font-light pl-1">
            {description || "Description of your site"}
          </h3>
          {image ? (
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
        <NameInputCard
          {...card}
          type={card.type}
          siteId={siteId}
          key={card.title}
          name={title}
          siteTitle={title}
          siteDescription={description}
        />
      ))}
    </>
  );
};

export default SeoSettings;

export const dynamicParams = true;

export const generateStaticParams = async () => {
  return [];
};
