import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { RxHome } from "react-icons/rx";
import { HiExternalLink } from "react-icons/hi";
import { VscFileSymlinkDirectory } from "react-icons/vsc";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export type PageLinks = {
  path: string;
  content: string;
  words: number;
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
  {
    accessorKey: "words",
    header: "Words",
    cell: ({ row }) => {
      const words: number = row.getValue("words");
      return <span>{words}</span>;
    },
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      const content: string = row.getValue("content");
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <HiExternalLink className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-lightPrimary dark:bg-navy-900 max-w-3xl max-h-[650px] overflow-auto">
            <DialogHeader>
              <DialogTitle className="font-bold text-xl">
                Source: {row.getValue("path")}
              </DialogTitle>
              <DialogDescription className="text-left pt-2 font-normal text-md text-black dark:text-white">
                Content: {content}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
