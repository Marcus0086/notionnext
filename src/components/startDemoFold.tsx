"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { HeroHighlight, Highlight } from "@/components/ui/heroHighlight";
import { config } from "@/config";
import { httpPrefix, domainSuffix } from "@/lib/config";

const StartFreeDemo = () => {
  return (
    <section className="border-t border-gray-800 rounded-md mt-32 w-full">
      <HeroHighlight className="flex flex-col items-center justify-center w-full gap-y-2">
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-white max-w-5xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          The new age of websites starts here. <br />
        </motion.h2>
        <p className="max-w-2xl text-sm md:text-base lg:text-lg font-semibold text-center">
          Join community of innovators building hassle-free, scalable websites
          with {config.COMAPNY_NAME}.
        </p>
        <Highlight className="px-4 py-2 mt-3">
          <Link
            href={`${httpPrefix}app.${domainSuffix}`}
            className="text-2xl font-bold text-white hover:underline"
          >
            Start Now
          </Link>
        </Highlight>
      </HeroHighlight>
    </section>
  );
};

export default StartFreeDemo;
