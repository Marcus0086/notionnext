"use client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

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
  const { handleDefaultReset, handleDefaultSave, saving, isVisible } =
    useSaveReset(siteId || "");

  return (
    <>
      {isVisible ? (
        <div className="flex items-center justify-end w-full gap-x-4">
          <Button
            variant={"outline"}
            onClick={handleSave ?? handleDefaultSave}
            className={cn(
              "rounded-xl text-center py-0 border-green-600",
              saved ?? saving
                ? "animate-pulse cursor-not-allowed pointer-events-none"
                : "",
            )}
          >
            <span className="font-normal text-xs text-green-600">Save</span>
          </Button>
          <Button
            variant={"outline"}
            onClick={handleReset ?? handleDefaultReset}
            className={cn(
              "rounded-xl text-center py-0 border-yellow-600",
              saved ?? saving ? "cursor-not-allowed pointer-events-none" : "",
            )}
          >
            <span className="font-normal text-xs text-yellow-600">Reset</span>
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SaveResetButtons;
