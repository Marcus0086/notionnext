"use client";

import { useTheme } from "next-themes";
import { RxMoon, RxSun } from "react-icons/rx";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const ThemeButton = ({ forceVisible }: { forceVisible?: boolean }) => {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="icon"
      className="focus:!outline-none focus:!ring-transparent hover:!bg-transparent"
    >
      <RxSun
        className={cn(
          "h-[1rem] w-[1rem]",
          forceVisible ? "text-white" : "",
          "rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
        )}
      />
      <RxMoon
        className={cn(
          "absolute",
          "h-[1rem] w-[1rem]",
          "rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
        )}
      />
    </Button>
  );
};

export default ThemeButton;
