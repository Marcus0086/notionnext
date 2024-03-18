"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { FILTERS } from "@/components/dashboard/constants";
import { cn } from "@/lib/utils";

const Tabs = () => {
  const searchParams = useSearchParams() || new URLSearchParams();
  const param = searchParams.get("filter")?.toLocaleLowerCase() || "draft";
  return (
    <ul className="flex items-center justify-center gap-x-3 sm:gap-x-12">
      {FILTERS.map((filter, index) => (
        <li key={index}>
          <Link
            href={{
              pathname: "/home",
              ...(filter !== "Draft" && {
                query: { filter: filter.toLocaleLowerCase() },
              }),
            }}
            className={cn(
              "bg-gray-400 rounded-3xl px-4 py-1",
              "transition-colors duration-300 ease-in-out",
              param === filter.toLocaleLowerCase()
                ? filter === "Live"
                  ? "bg-green-400"
                  : filter === "Draft"
                    ? "bg-yellow-400"
                    : filter === "Archived"
                      ? "bg-red-400"
                      : ""
                : "",
            )}
          >
            <span className="text-white text-sm">{filter}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
