"use client";

import { useServerInsertedHTML } from "next/navigation";
import { useRef } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { config } from "@/config";

const FAQJsonLd = ({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return structuredData;
};

const Faqs = () => {
  const jsonLd = FAQJsonLd({ faqs: config.FAQ_DATA });
  const isServerInserted = useRef(false);
  useServerInsertedHTML(() => {
    if (!isServerInserted.current) {
      isServerInserted.current = true;
      return (
        <>
          <script
            id="faq-json-ld"
            type="application/ld+json"
            async
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </>
      );
    }
  });
  return (
    <section className="mt-24 md:mt-48 px-8 lg:mx-auto w-full flex-col lg:flex-row flex items-center justify-center">
      <div className="flex flex-col items-center text-center lg:text-start lg:items-start justify-center gap-2 w-full lg:w-[40%]">
        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600 text-2xl sm:text-4xl md:text-6xl font-semibold">
          Find about our services
        </h3>
        <p className="text-sm text-white">
          Our team is always ready to help you with any questions you have.
          <br />
          We are always there to help from the beginning to the end.
        </p>
      </div>
      <Accordion
        type="single"
        collapsible
        className="mt-8 w-full lg:max-w-[28rem]"
      >
        {config.FAQ_DATA.map(({ question, answer }, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>
              <h4 className="md:text-lg lg:text-xl text-start text-white">
                {question}
              </h4>
            </AccordionTrigger>
            <AccordionContent className="text-white leading-6 font-light text-sm md:text-base lg:text-lg">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Faqs;
