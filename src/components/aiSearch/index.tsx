"use client";

import { useMemo } from "react";
import { WiStars } from "react-icons/wi";
import { ExtendedRecordMap } from "notion-types";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";
import Chat from "@/components/aiSearch/chat";

import { getBlockContent } from "@/lib/blockContent";

const AiSearch = ({ recordMap }: { recordMap?: ExtendedRecordMap }) => {
  const pageContent = useMemo(() => getBlockContent(recordMap), [recordMap]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          aria-label="AI Search"
          disabled={false}
          className="breadcrumb button flex items-center justify-center text-center p-4"
        >
          AI Search
          <WiStars className="ml-2 w-5 h-5" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Notion Chat</DrawerTitle>
            <DrawerDescription>AI Search</DrawerDescription>
          </DrawerHeader>
        </div>

        <div className="flex flex-col gap-y-2">
          <Chat pageContent={pageContent.text} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AiSearch;
