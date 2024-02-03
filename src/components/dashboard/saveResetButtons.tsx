"use client";

import { cn } from "@/lib/utils";

import useSaveReset from "@/hooks/useSaveReset";

const SaveResetButtons = ({
  handleReset,
  handleSave,
  saved,
  siteId,
}: {
  handleReset?: () => void;
  handleSave?: () => void;
  saved?: boolean;
  siteId?: string;
}) => {
  const { handleDefaultReset, handleDefaultSave, saving } = useSaveReset(
    siteId || "",
  );

  return (
    <div className="flex items-center justify-between w-full mt-2 gap-x-2">
      <button
        onClick={handleReset ?? handleDefaultReset}
        className="bg-blueZodiac dark:bg-navy-700 rounded-xl text-center w-full py-3"
      >
        <span className="text-white font-normal text-sm">Reset</span>
      </button>
      <button
        onClick={handleSave ?? handleDefaultSave}
        className={cn(
          "bg-brand-500 rounded-xl text-center w-full py-3",
          saved ?? saving
            ? "animate-pulse cursor-not-allowed pointer-events-none"
            : "",
        )}
      >
        <span className="text-white font-normal text-sm">Save</span>
      </button>
    </div>
  );
};

export default SaveResetButtons;
