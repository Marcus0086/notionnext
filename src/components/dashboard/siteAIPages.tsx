"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

import { DataTable } from "@/components/dashboard/dataTable";
import { columns } from "@/components/dashboard/column";
import KnowledgeBaseCard from "@/components/knowledgeBaseCard";
import { Button } from "@/components/ui/button";

import { getSiteDocuments } from "@/lib/actions/site";
import { trainKnowledgeBases } from "@/lib/actions/ai/create";

import useToast from "@/hooks/useToast";

import { Document } from "@/types/kb";

const SiteAIPages = ({ siteId }: { siteId: string }) => {
  const [isTraining, setIsTraining] = useState(false);
  const toastOptions = useToast();
  const { data: siteDocuments } = useQuery({
    queryKey: ["ai", siteId],
    queryFn: () => getSiteDocuments(siteId),
    placeholderData: null,
    staleTime: Infinity,
  });

  if (!siteDocuments) return null;

  const { canonicalPageMap, documents } = siteDocuments;

  const handleKbTraining = async () => {
    let kbDocuments: Document[] = [];
    documents.forEach((document) => {
      kbDocuments = kbDocuments.concat(document.subDocuments);
    });
    setIsTraining(true);
    toast.info("Training KB...", toastOptions);
    const response = await trainKnowledgeBases(kbDocuments, siteId);
    if (response && response.success) {
      toast.success(response.success, toastOptions);
    } else {
      toast.error(
        "Something went wrong!" + " " + response?.error,
        toastOptions
      );
    }
    setIsTraining(false);
  };

  return (
    <div className="flex flex-col items-start justify-center w-full">
      <DataTable data={canonicalPageMap} columns={columns} />
      <div className="flex w-full flex-col items-start justify-center gap-y-3">
        <div className="flex items-center justify-between w-full">
          <h3>Knowledge Bases</h3>
          <Button
            className="rounded-3xl"
            onClick={handleKbTraining}
            variant={"destructive"}
            disabled={isTraining}
          >
            {isTraining ? "Training" : "Train KB"}
          </Button>
        </div>
        <ul className="grid grid-cols-2 gap-3 overflow-auto w-full">
          {documents.map((document, index) => (
            <KnowledgeBaseCard key={index} document={document} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SiteAIPages;
