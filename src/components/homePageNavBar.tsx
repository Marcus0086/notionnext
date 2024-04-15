import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import ThemeButton from "@/components/shared/themeButton";

import NavigationMenuContentDescription from "@/components/navigationMenuContentDescription";
import HoverBorderGradient from "@/components/ui/hoverBorderGradient";

import { cn } from "@/lib/utils";
import { domainSuffix, httpPrefix } from "@/lib/config";

const HomePageNavBar = () => {
  return (
    <header
      className={cn(
        "fixed right-0 left-0 top-0 p-4",
        "bg-black/40 backdrop-blur-lg z-[100]",
        "flex items-center justify-between",
        "border-b border-neutral-900"
      )}
    >
      <aside className="flex items-center gap-[2px]">
        <Link href="/" className="font-bold tex-3xl text-white">
          Nn
        </Link>
      </aside>
      <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block">
        <NavigationMenuContentDescription />
      </nav>
      <aside className="flex items-center gap-4">
        <Link href={`${httpPrefix}app.${domainSuffix}`}>
          <HoverBorderGradient>Dashboard</HoverBorderGradient>
        </Link>
        <HamburgerMenuIcon className="w-6 h-6 lg:hidden text-gray-300" />
        <ThemeButton forceVisible={true} />
      </aside>
    </header>
  );
};

export default HomePageNavBar;
