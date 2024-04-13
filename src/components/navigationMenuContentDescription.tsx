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
    href: "/features/performance",
    description:
      "Get the best performance with latest technologies and optimizations.",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
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
        </a>
      </NavigationMenuLink>
    </li>
  );
});

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
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Notionnext
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautiful websites made easy.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/features/getting-started"
                title="Creating a Site"
              >
                Creating a site with Notionnext takes seconds.
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
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuContentDescription;
