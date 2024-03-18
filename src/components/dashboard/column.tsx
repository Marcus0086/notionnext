"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { RxHome } from "react-icons/rx";
import { VscFileSymlinkDirectory } from "react-icons/vsc";

import { cn } from "@/lib/utils";

export type PageLinks = {
  path: string;
  content?: string;
  words?: number;
};
const columns: ColumnDef<PageLinks>[] = [
  {
    accessorKey: "path",
    header: "Path",
    cell: ({ row }) => {
      const path: string = row.getValue("path");
      const isIndexPage = path === "/home";
      return (
        <div className={cn("flex justify-start items-center gap-x-2")}>
          {isIndexPage ? (
            <RxHome className="w-4 h-4" />
          ) : (
            <VscFileSymlinkDirectory />
          )}
          <Link
            href={!isIndexPage ? `?pageId=${path}` : ""}
            className="text-sm hover:underline hover:text-blue-500"
          >
            {!isIndexPage ? `/${path}` : "/home"}
          </Link>
        </div>
      );
    },
  },
];

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

export type { DataTableProps };

export { columns };
