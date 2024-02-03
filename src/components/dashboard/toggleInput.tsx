import { TogglesInputFactory } from "@/lib/factories/toggleInput";
import { cn } from "@/lib/utils";

import { ToggleInputs } from "@/types";

const ToggleInput = ({
  type,
  siteId,
}: {
  type: ToggleInputs;
  siteId: string;
}) => {
  const Input = TogglesInputFactory.getInput(type, siteId);
  return Input;
};

const ToggleInputCard = ({
  title,
  description,
  type,
  siteId,
}: {
  title: string;
  description: string;
  type: ToggleInputs;
  siteId: string;
}) => {
  return (
    <li
      className={cn(
        "bg-white dark:bg-navy-800 shadow w-full rounded-xl",
        "p-4 flex flex-col items-start justify-between gap-y-3 font-normal"
      )}
    >
      <h3 className="text-cloudBurst dark:text-white text-base">{title}</h3>
      <p className="text-gray-700 text-xs">{description}</p>
      <ToggleInput type={type} siteId={siteId} />
    </li>
  );
};

export default ToggleInputCard;
