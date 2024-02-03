"use client";
import OutlinedIcon from "@/components/dashboard/outlinedIcon";

import { IconsFactory } from "@/lib/factories/icon";

import { Icons } from "@/types";

const AsideIcons = ({ icon, label }: { icon: Icons; label?: string }) => {
  const iconProps = IconsFactory.getIcon(icon);
  return <OutlinedIcon iconProps={iconProps} label={label} />;
};

export default AsideIcons;
