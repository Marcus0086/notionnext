import { SiPowerpages } from "react-icons/si";

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
  };
}) => {
  return (
    <Dialog>
      <li className="flex flex-col items-start justify-center h-full p-2 gap-y-2 border border-gray-300 rounded-md w-full">
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="bg-gray-200 dark:bg-blue-950 w-full flex items-center justify-center rounded-md py-4 h-full"
          >
            <SiPowerpages className="w-16 h-16 text-gray-500" />
          </Button>
        </DialogTrigger>
        <p className="text-sm text-gray-900 dark:text-gray-300 whitespace-nowrap text-left overflow-ellipsis overflow-hidden w-32 h-full">
          {document.doc.source.replace("/", "")}
        </p>
        <p className="text-sm text-gray-900 dark:text-gray-300 text-start">
          Resources: {document.subDocuments.length}
        </p>
      </li>
      <DialogContent className="max-w-3xl max-h-[650px] overflow-auto">
        <DialogDescription className="pt-2 font-normal text-lg text-black dark:text-white">
          <Table>
            <TableCaption>
              A list of all the Resources your data lake has
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead className="w-[100px]">Parent Site</TableHead>
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
