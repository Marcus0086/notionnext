import Link from "next/link";
import Image from "next/image";

import { config } from "@/config";
import { cn } from "@/lib/utils";

const date = new Date().getFullYear();

const FooterLinks = [
  {
    title: "Showcase",
    href: "#showcase",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "SEO",
    href: "/features/seo",
  },
  {
    title: "Domains",
    href: "/features/custom-domains",
  },
  {
    title: "Code",
    href: "/features/custom-code",
  },
  {
    title: "Customization",
    href: "/features/customization",
  },
  {
    title: "Create a site",
    href: "/features/getting-started",
  },
  {
    title: "High Performance",
    href: "/features/high-performance",
  },
];
const Footer = () => {
  return (
    <footer
      className={cn(
        "bg-neutral-950 border-gray-800 text-gray-400",
        "mt-36 w-full gap-4 py-6 px-8 lg:px-32 border-t text-sm",
        "flex flex-col items-start justify-center"
      )}
    >
      <nav className="flex items-center justify-center w-full sm:w-auto gap-2">
        <Image
          src="/favicon.ico"
          width={24}
          height={24}
          alt={config.COMAPNY_NAME}
        />
        <Link href="/" className="font-bold text-2xl text-white">
          {config.COMAPNY_NAME}
        </Link>
      </nav>
      <ul className="w-full flex flex-wrap whitespace-nowrap items-center justify-start gap-4">
        {FooterLinks.map((link) => (
          <li key={link.title} className="hover:underline">
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
      <nav className="w-full flex flex-col sm:flex-row items-center sm:justify-between gap-4 text-neutral-500 text-xs">
        <p>
          © {date} {config.COMAPNY_NAME} Co. All rights reserved.
        </p>
        <div className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#">Terms of Service</Link>
          <Link href="#">Privacy</Link>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
