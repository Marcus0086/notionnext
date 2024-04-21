"use client";

import Link from "next/link";
import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
import { config } from "@/config";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Custom Design",
    href: "/features/customization",
    description:
      "Customize your site with themes and design to match your brand.",
  },
  {
    title: "Best in Class SEO",
    href: "/features/seo",
    description:
      "Take your site to the next level with best in class SEO features.",
  },
  {
    title: "Custom Domains & SSL",
    href: "/features/custom-domains",
    description:
      "Secure your site with SSL and make it your own with custom domains.",
  },
  {
    title: "Custom Code",
    href: "/features/custom-code",
    description: "Add custom code for unlimited flexibility and integrations.",
  },
  {
    title: "High Performance",
    href: "/features/high-performance",
    description:
      "Get the best performance with latest technologies and optimizations.",
  },
];

const ListItem = (
  {
    title,
    children,
    className,
    href,
    ...props
  }: {
    title: string;
    children: React.ReactNode;
    className?: string;
    href: string;
  },
  ref: React.Ref<HTMLAnchorElement>
) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

ListItem.displayName = "ListItem";

const NavigationMenuContentDescription = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {config.COMAPNY_NAME}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautiful websites made easy.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/features/getting-started"
                title="Creating a Site"
              >
                Creating a site with {config.COMAPNY_NAME} takes seconds.
              </ListItem>
              <ListItem href="/features/customization" title="Customization">
                Customize your site with themes and design.
              </ListItem>
              <ListItem
                href="/features/deployment"
                title="Deployment & Hosting"
              >
                Deploy your site with a single click.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href="#showcase">Showcase</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <Link href="/pricing">Pricing</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuContentDescription;
