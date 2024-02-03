"use client";
import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/dashboard/dataTable";
import { columns } from "@/components/dashboard/column";
import KnowledgeBaseCard from "@/components/knowledgeBaseCard";

import { getSiteDocuments } from "@/lib/actions/site";

const SiteAIPages = ({ siteId }: { siteId: string }) => {
  const { data } = useQuery({
    queryKey: ["pages", siteId],
    queryFn: () => getSiteDocuments(siteId),
    placeholderData: null,
    staleTime: Infinity,
  });

  if (!data) return null;

  const { canonicalPageMap, documents } = data;

  return (
    <div className="flex flex-col items-start justify-center w-full">
      <DataTable data={canonicalPageMap} columns={columns} />
      <div className="flex w-full flex-col items-start justify-center gap-y-3">
        <h3>Data Lake</h3>
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
