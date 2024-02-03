"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const GithubThemeIcon = () => {
  const { theme } = useTheme();
  const src = useMemo(() => {
    return theme === "dark" || theme === "system"
      ? "/images/auth/github-mark-white.svg"
      : "/images/auth/github-mark.svg";
  }, [theme]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <Image src={src} width={20} height={20} alt="GitHub Logo" loading="lazy" />
  );
};

export default GithubThemeIcon;
