import React from "react";
import { SlashIcon } from "@radix-ui/react-icons";

import { BreadcrumbPage } from "@/components/ui/breadcrumb";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Breadcrumbs = ({ path }: { path: string }) => {
  const paths = path.split("/").filter((p) => p);
  return (
    <Breadcrumb className="capitalize">
      <BreadcrumbList>
        {paths.map((pathSegment, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index < paths.length - 1 ? (
                <BreadcrumbLink
                  href={`/${paths.slice(0, index + 1).join("/")}`}
                >
                  {pathSegment}
                </BreadcrumbLink>
              ) : (
                pathSegment
              )}
            </BreadcrumbItem>
            {index < paths.length - 1 && (
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
