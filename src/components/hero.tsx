import Image from "next/image";

import { ContainerScroll } from "@/components/containerScrollAnimation";
import { Spotlight } from "@/components/spotlight";
import TryNowButton from "@/components/tryNow";

import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section
      className={cn(
        "!overflow-visible z-10",
        "bg-black/[0.96] bg-grid-white/[0.02]",
        "rounded-md relative",
        "w-full h-full",
        "flex flex-col items-center antialiased"
      )}
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="flex flex-col -mt-12">
        <ContainerScroll
          titleComponent={
            <div className="flex items-center flex-col">
              <TryNowButton />
              <h1 className="text-3xl md:text-5xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                Craft Beautiful Websites Today With Notion
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
    </section>
  );
};

export default Hero;
