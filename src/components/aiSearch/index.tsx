"use client";

import { WiStars } from "react-icons/wi";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";
import Chat from "@/components/aiSearch/chat";

const AiSearch = ({ tenant, siteId }: { tenant?: string; siteId?: string }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          aria-label="Chat"
          disabled={false}
          className="breadcrumb button flex items-center justify-center text-center p-4"
        >
          Chat
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
          <Chat tenant={tenant} siteId={siteId} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AiSearch;
