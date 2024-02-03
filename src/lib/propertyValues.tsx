import React from "react";
import { formatDate } from "notion-utils";

export const propertyLastEditedTimeValue = (
  { block, pageHeader }: { block?: any; pageHeader: any },
  defaultFn: () => React.ReactNode,
) => {
  if (pageHeader && block?.last_edited_time) {
    return `Last updated ${formatDate(block?.last_edited_time, {
      month: "long",
    })}`;
  }

  return defaultFn();
};

export const propertyDateValue = (
  { data, schema, pageHeader }: { data?: any; schema?: any; pageHeader: any },
  defaultFn: () => React.ReactNode,
) => {
  if (pageHeader && schema?.name?.toLowerCase() === "published") {
    const publishDate = data?.[0]?.[1]?.[0]?.[1]?.start_date;

    if (publishDate) {
      return `${formatDate(publishDate, {
        month: "long",
      })}`;
    }
  }

  return defaultFn();
};

export const propertyTextValue = (
  { schema, pageHeader }: { schema?: any; pageHeader: any },
  defaultFn: () => React.ReactNode,
) => {
  if (pageHeader && schema?.name?.toLowerCase() === "author") {
    return <b>{defaultFn()} </b>;
  }
  return defaultFn();
};
