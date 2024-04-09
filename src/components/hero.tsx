import Image from "next/image";
import dynamic from "next/dynamic";

import { ContainerScroll } from "@/components/containerScrollAnimation";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/movingCards";
import { DEMOS, TESTIMONIALS } from "@/components/dashboard/constants";
const HeroParallax = dynamic(() => import("@/components/heroParallax"));

import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <>
      <section
        className={cn(
          "!overflow-visible bg-neutral-950",
          "rounded-md relative",
          "w-full h-full",
          "flex flex-col items-center antialiased",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 items-center",
            "h-full w-full px-5 py-24",
            "[background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]",
          )}
        />
        <div className="flex flex-col -mt-12">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center flex-col">
                <Button
                  size={"lg"}
                  className={cn(
                    "flex items-center justify-center",
                    "md:p-8 p-6 mb-8 md:mb-0 text-xl md:text-2xl gap-4",
                    "w-fit",
                    "border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white",
                    "group transition-all hover:shadow-xl hover:shadow-neutral-500 duration-500",
                  )}
                >
                  <span
                    className={cn(
                      "bg-clip-text text-transparent",
                      "bg-gradient-to-r from-neutral-500  to-neutral-600",
                      "md:text-center font-sans",
                      "group-hover:bg-gradient-to-r group-hover::from-black group-hover:to-black",
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
              src={`/images/home/demo.webp`}
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl h-full object-left-top"
            />
          </ContainerScroll>
        </div>
        <InfiniteMovingCards
          speed={"slow"}
          direction="right"
          className="-mt-28"
          items={TESTIMONIALS}
        />
      </section>
      <section>
        <HeroParallax products={DEMOS} />
      </section>
    </>
  );
};

export default Hero;
