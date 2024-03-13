import { SiPowerpages } from "react-icons/si";
import { KnowledgeBase } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { Document } from "@/types";

const KnowledgeBaseCard = ({
  document,
}: {
  document: {
    doc: Document;
    subDocuments: Document[];
    kb?: KnowledgeBase;
  };
}) => {
  return (
    <Dialog>
      <li className="flex flex-col items-start justify-center h-full p-2 gap-y-2 border border-gray-300 rounded-md w-full">
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="relative bg-gray-200 dark:bg-blue-950 w-full flex items-center justify-center rounded-md py-4 h-full"
          >
            <SiPowerpages className="w-16 h-16 text-gray-500" />
            <p className="flex items-center justify-center gap-x-1 text-[8px] leading-3 rounded-3xl px-2 py-1 absolute -top-0 -right-1">
              {document.kb?.isTrained ? "Trained" : "Not Trained"}
              {document.kb?.isTrained ? (
                <span className="animate-pulse w-1 h-1 rounded-full bg-green-500 dark:bg-green-300" />
              ) : (
                <span className="animate-pulse w-1 h-1 rounded-full bg-red-500 dark:bg-red-300" />
              )}
            </p>
          </Button>
        </DialogTrigger>
        <p className="text-sm text-gray-900 dark:text-gray-300 whitespace-nowrap text-left overflow-ellipsis overflow-hidden w-32 h-full">
          {document.doc.source.replace("/", "")}
        </p>

        <p className="text-sm text-gray-900 dark:text-gray-300 text-start">
          Resources: {document.subDocuments.length}
        </p>
        <p className="text-[8px] leading-3 font-light text-gray-800 dark:text-gray-200 text-start">
          {document.kb?.trainedAt
            ? `Created At: ${document.kb.trainedAt.toDateString()}`
            : ""}
        </p>
      </li>
      <DialogContent className="bg-lightPrimary dark:bg-navy-900 max-w-3xl max-h-[650px] overflow-auto">
        <DialogDescription className="pt-2 font-normal text-lg text-black dark:text-white">
          <Table>
            <TableCaption>
              A list of all the Resources your data lake has
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead className="w-[100px]">Site Name</TableHead>
                <TableHead className="w-[100px]">Source</TableHead>
                <TableHead className="text-left">Content</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {document.subDocuments.map((doc, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{doc.site}</TableCell>
                  <TableCell>{doc.source}</TableCell>
                  <TableCell className="text-left">{doc.pageContent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default KnowledgeBaseCard;
