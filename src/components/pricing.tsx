import { CheckIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";

import { PLANS } from "@/components/dashboard/constants";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3dCard";
const LampComponent = dynamic(() => import("@/components/ui/lampContainer"));

import { cn } from "@/lib/utils";

const Pricing = () => {
  return (
    <section>
      <LampComponent />
      <div
        className={cn(
          "flex flex-wrap items-center justify-center flex-col md:flex-row",
          "gap-8 -mt-72 px-2",
        )}
      >
        {PLANS.map(
          ({ title, price, description, features, contactSales }, index) => (
            <CardContainer key={index}>
              <CardBody
                className={cn(
                  "bg-gray-50 relative",
                  "group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1]",
                  "dark:bg-black dark:border-white/[0.2] border-black/[0.1]",
                  "w-[305px] sm:w-full md:w-[350px] h-auto",
                  "rounded-xl !p-6 border",
                )}
              >
                <CardItem
                  translateZ={50}
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {title}
                  <h2>{price}</h2>
                </CardItem>
                <CardItem
                  translateZ={60}
                  className="text-sm max-w-sm mt-2 text-neutral-600 dark:text-white"
                >
                  {description}
                  <ul className="my-4 flex flex-col gap-2">
                    {features.map(({ title: feature_title, info }, index) => (
                      <li className="flex items-center gap-2" key={index}>
                        <CheckIcon className="w-5 h-5 text-green-500" />
                        {feature_title}
                      </li>
                    ))}
                  </ul>
                </CardItem>
                {!contactSales ? (
                  <div className="flex justify-between items-center w-full mt-8">
                    <CardItem
                      as={"button"}
                      translateZ={20}
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                      Try Now →
                    </CardItem>
                    <CardItem
                      as={"button"}
                      translateZ={20}
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      Get Started Now
                    </CardItem>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <CardItem
                      translateZ={20}
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                      as={"button"}
                    >
                      Contact Sales
                    </CardItem>
                  </div>
                )}
              </CardBody>
            </CardContainer>
          ),
        )}
      </div>
    </section>
  );
};

export default Pricing;