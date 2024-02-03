import Image from "next/image";

const SiteCardImage = ({
  imageUrl,
  name,
}: {
  imageUrl?: string | null;
  name: string;
}) => {
  return (
    <Image
      loading="lazy"
      quality={10}
      fill
      src={imageUrl || "/images/dashboard/defaultCard.svg"}
      alt={name}
      className="rounded-xl border border-selago dark:border-blueZodiac object-cover"
    />
  );
};

export default SiteCardImage;
