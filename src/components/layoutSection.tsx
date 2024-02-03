"use client";

import { useSelectedLayoutSegment } from "next/navigation";

import { cn } from "@/lib/utils";

const LayoutSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const layout = useSelectedLayoutSegment();
  const useFullWidth = layout === "ai" ? true : false;
  return (
    <section
      className={cn(
        "h-full ml-0 sm:ml-10 transition-all duration-150 ease-in-out",
        !useFullWidth ? "llg:w-1/4 w-full" : "w-full",
      )}
    >
      {children}
    </section>
  );
};

export default LayoutSection;
