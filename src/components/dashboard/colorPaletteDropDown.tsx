"use client";

import { Disclosure } from "@headlessui/react";
import { AccountType } from "@prisma/client";
import { FiChevronUp } from "react-icons/fi";
import { useState } from "react";
import { useTheme } from "next-themes";

import { PALETTE } from "@/components/dashboard/constants";

import { useParentPageSettings } from "@/context/parentPage";

import { cn } from "@/lib/utils";

const ColorPaletteDropDown = ({ account }: { account: AccountType }) => {
  const accountType = account;
  const [selectedTheme, setSelectedTheme] = useState("");
  const { theme } = useTheme();
  const { settings, setSettings } = useParentPageSettings();

  const handleThemeChange = (
    background: string,
    name: string,
    type: string
  ) => {
    let css = "";
    if (type === "dark") {
      if (theme === "dark") {
        css = `.dark-mode{--bg-color:${background}!important}`;
      }
    } else {
      css = `:root{--bg-color:${background}!important}`;
    }
    const settingsCss = settings?.site?.css ?? "";
    const newSettingsCss = settingsCss.includes(css)
      ? settingsCss.replace(css, "") + css
      : settingsCss + css;
    setSettings({
      ...settings,
      site: {
        ...settings?.site,
        userId: settings?.site?.userId || "",
        notionAuthToken: settings?.site?.notionAuthToken || "",
        notionUserId: settings?.site?.notionUserId || "",
        id: settings?.site?.id || "",
        css: newSettingsCss,
        name: settings?.site?.name || "",
        rootNotionPageId: settings?.site?.rootNotionPageId || "",
        rootNotionSpaceId: settings?.site?.rootNotionSpaceId || "",
      },
      miscelanous: {
        ...settings?.miscelanous,
        css: newSettingsCss,
      },
    });
    setSelectedTheme(name);
  };

  const handleCssThemeChange = (css: string, name: string) => {
    setSettings({
      ...settings,
      site: {
        ...settings?.site,
        userId: settings?.site?.userId || "",
        notionAuthToken: settings?.site?.notionAuthToken || "",
        notionUserId: settings?.site?.notionUserId || "",
        id: settings?.site?.id || "",
        css: css,
        name: settings?.site?.name || "",
        rootNotionPageId: settings?.site?.rootNotionPageId || "",
        rootNotionSpaceId: settings?.site?.rootNotionSpaceId || "",
      },
      miscelanous: {
        ...settings?.miscelanous,
        css: css,
      },
    });
    setSelectedTheme(name);
  };

  return (
    <Disclosure defaultOpen={true}>
      {({ open }) => (
        <>
          <Disclosure.Button
            as="li"
            className={cn(
              "text-base font-medium text-cloudBurst dark:text-selago",
              "w-full flex justify-between items-start outline-none cursor-pointer p-2 rounded-lg",
              "border border-gray-300 dark:border-navy-700"
            )}
          >
            Color Palette
            <FiChevronUp
              className={cn(
                "w-5 h-5 transition-transform duration-150 ease-in-out",
                open ? "transform rotate-180" : ""
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel
            className={cn(
              "grid grid-cols-3 3xl:grid-cols-4 items-center justify-center gap-4"
            )}
          >
            {PALETTE.map(
              ({ background, name, type, css, placeholder }, index) => (
                <li key={index} className="text-center w-full h-full">
                  <button
                    className={cn(
                      "w-full xl:w-20 h-16 ",
                      "rounded-md cursor-pointer hover:shadow-lg",
                      selectedTheme === name
                        ? "ring-2 ring-offset-2 ring-brandLinear"
                        : ""
                    )}
                    onClick={() => {
                      if (background) {
                        handleThemeChange(background, name, type);
                      } else if (css && type === "custom") {
                        handleCssThemeChange(css, name);
                      }
                    }}
                    style={{
                      background: background || `url(${placeholder})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <h6 className="text-xs text-cloudBurst dark:text-selago">
                    {name}
                  </h6>
                </li>
              )
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default ColorPaletteDropDown;
