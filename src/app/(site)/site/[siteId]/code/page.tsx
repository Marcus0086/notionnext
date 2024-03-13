import { notFound } from "next/navigation";
import { PiWarningCircleDuotone } from "react-icons/pi";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Editor from "@/components/dashboard/editor";
import UpgardeButton from "@/components/dashboard/upgradeButton";

import getSessionUser from "@/lib/getSessionUser";

const CodeSettings = async () => {
  const user = await getSessionUser();
  if (!user) {
    notFound();
  }
  return (
    <>
      {user?.accountType === "FREE" ? (
        <Accordion
          value="item-1"
          type="single"
          className="w-full border rounded-xl px-4"
        >
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="text-start text-xs hover:no-underline">
              <div className="flex items-center justify-between gap-2">
                <PiWarningCircleDuotone className="w-4 h-4" />
                {"Changes won't be applied to the live site"}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-start text-xs leading-5 text-muted-foreground flex flex-col items-start justify-center gap-2">
              {
                "Upgrade to a paid plan to apply your JavaScript changes to the live site. Unleash the full power of customization!"
              }
              <UpgardeButton />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : null}
      <Editor />
    </>
  );
};

export default CodeSettings;

export const dynamicParams = true;

export const generateStaticParams = async () => {
  return [];
};
