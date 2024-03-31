import Image from "next/image";

import { ContainerScroll } from "@/components/containerScrollAnimation";
import HomePageNavBar from "@/components/homePageNavBar";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { InfiniteMovingCards } from "@/components/movingCards";

const testimonials = [
  {
    href: "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
    alt: "Moonbeam",
  },
  {
    href: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    alt: "Moonbeam",
  },
  {
    href: "https://aceternity.com/images/products/thumbnails/new/rogue.png",
    alt: "Moonbeam",
  },
  {
    href: "https://aceternity.com/images/products/thumbnails/new/editorially.png",
    alt: "Moonbeam",
  },
  {
    href: "https://aceternity.com/images/products/thumbnails/new/editrix.png",
    alt: "Moonbeam",
  },
  {
    href: "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
    alt: "Moonbeam",
  },
];

const HomePage = () => {
  return (
    <main className="flex items-center flex-col justify-center bg-neutral-950 overflow-hidden">
      <HomePageNavBar />
      <section
        className={cn(
          "!overflow-visible",
          "rounded-md relative",
          "w-full h-full",
          "flex flex-col items-center antialiased"
        )}
      >
        <div className="flex flex-col -mt-12">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center flex-col">
                <Button
                  size={"lg"}
                  className={cn(
                    "flex items-center justify-center",
                    "p-8 mb-8 md:mb-0 text-2xl gap-4",
                    "w-fit",
                    "border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white",
                    "group transition-all hover:shadow-xl hover:shadow-neutral-500 duration-500"
                  )}
                >
                  <span
                    className={cn(
                      "bg-clip-text text-transparent",
                      "bg-gradient-to-r from-neutral-500  to-neutral-600",
                      "md:text-center font-sans",
                      "group-hover:bg-gradient-to-r group-hover::from-black group-hover:to-black"
                    )}
                  >
                    Try it now
                  </span>
                </Button>
                <h1 className="text-3xl md:text-5xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                  Craft Beautiful Websites Today With Notionnext
                </h1>
              </div>
            }
          >
            <Image
              src={`/images/home/linear.webp`}
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
            />
          </ContainerScroll>
        </div>
      </section>
      <InfiniteMovingCards
        speed={"slow"}
        direction="right"
        className="-mt-28"
        items={testimonials}
      />
    </main>
  );
};

export default HomePage;
