"use client";

import Link from "next/link";
import Image from "next/image";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { CollectionViewPageBlock, PageBlock } from "notion-types";
import { Search } from "react-notion-x";

import ThemeButton from "@/components/shared/themeButton";
import NavigationMenuContentDescription from "@/components/navigationMenuContentDescription";
import HoverBorderGradient from "@/components/ui/hoverBorderGradient";

import { cn } from "@/lib/utils";
import { domainSuffix, httpPrefix } from "@/lib/config";
import { config } from "@/config";

import { SiteConfig } from "@/types";

const HomePageNavBar = ({
  siteConfig,
  block,
}: {
  siteConfig?: SiteConfig;
  block?: CollectionViewPageBlock | PageBlock;
}) => {
  return (
    <header
      className={cn(
        "fixed right-0 left-0 top-0 p-4",
        "bg-black/40 backdrop-blur-lg z-[100]",
        "flex items-center justify-between",
        "border-b border-neutral-900"
      )}
    >
      <aside className="flex items-center gap-2">
        <Image
          src="/favicon.ico"
          width={24}
          height={24}
          alt={config.COMAPNY_NAME}
        />
        <Link href="/" className="font-bold text-2xl text-white">
          {config.COMAPNY_NAME}
        </Link>
      </aside>
      <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block">
        <NavigationMenuContentDescription />
      </nav>
      <aside className="flex items-center gap-4">
        {siteConfig?.isSearchEnabled && block && (
          <Search block={block} title={null} />
        )}
        <Link
          className="hidden md:flex"
          href={`${httpPrefix}app.${domainSuffix}`}
        >
          <HoverBorderGradient>Dashboard</HoverBorderGradient>
        </Link>
        <HamburgerMenuIcon className="w-6 h-6 lg:hidden text-gray-300" />
        <ThemeButton forceVisible={true} />
      </aside>
    </header>
  );
};

export default HomePageNavBar;
