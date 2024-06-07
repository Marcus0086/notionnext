"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { FiChevronUp } from "react-icons/fi";
import { HexColorPicker } from "react-colorful";
import { useTheme } from "next-themes";

import { Slider } from "@/components/ui/slider";

import { cn } from "@/lib/utils";
import { useParentPageSettings } from "@/context/parentPage";
import useClickOutside from "@/hooks/useClickOutSide";

import { DesignSettingsDropDownType } from "@/types/component-types";

const ColorPickerDropdown = ({
  title,
  componentItems,
}: DesignSettingsDropDownType) => {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean[]>(
    new Array(componentItems.length).fill(false),
  );

  const { theme } = useTheme();

  const [styleMap, setStyleMap] = useState<{
    [key: string]: {
      [key: string]: string | undefined;
    };
  }>(() => ({
    main_bg: {
      css_var: "--bg-color",
    },
    main_text_color: {
      css_var: "--fg-color",
    },
    main_text_size: {
      size: "14px",
    },
    main_title_size: {
      size: "16px",
    },
    navbar_bg: {
      css_var: "--bg-color",
    },
    navbar_text_color: {
      css_var: "--fg-color",
    },
    footer_bg: {
      css_var: "--bg-color",
    },
    footer_text_color: {
      css_var: "--fg-color",
    },
  }));

  const { settings, setSettings } = useParentPageSettings();
  const memoizedSettings = useMemo(() => settings, [settings]);
  useEffect(() => {
    if (
      document &&
      settings?.config?.main_text_size === undefined &&
      settings?.config?.main_title_size === undefined
    ) {
      const mainTitleElement =
        document.getElementsByClassName("notion-title")[0];
      const mainElement = document.getElementsByClassName("notion")[0];
      if (mainTitleElement) {
        setStyleMap((prev) => ({
          ...prev,
          main_title_size: {
            ...prev.main_title_size,
            size: getComputedStyle(mainTitleElement).fontSize,
          },
        }));
      }
      if (mainElement) {
        setStyleMap((prev) => ({
          ...prev,
          main_text_size: {
            ...prev.main_text_size,
            size: getComputedStyle(mainElement).fontSize,
          },
        }));
      }
    }
  }, [
    settings?.recordMap,
    settings?.config?.main_text_size,
    settings?.config?.main_title_size,
  ]);

  const toggle = (index: number) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  const close = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (popover.current && popover.current.contains(event.target as Node)) {
        return;
      }
      setIsOpen(new Array(componentItems.length).fill(false));
    },
    [componentItems.length],
  );
  useClickOutside(popover, close);

  const handleColorChange = (color: string, id: string) => {
    const style = styleMap[id];
    if (!style) return;
    const propertyId = theme === "dark" ? `${id}_dark` : id;
    setStyleMap((prev) => ({
      ...prev,
      [propertyId]: { ...prev[id], color },
    }));
    setSettings({
      ...settings,
      config: {
        ...settings?.config,
        id: settings?.config?.id || "",
        rootNotionPageId: settings?.config?.rootNotionPageId || "",
        rootNotionSpaceId: settings?.config?.rootNotionSpaceId || "",
        name: settings?.config?.name || "",
        domain: settings?.config?.domain || "",
        author: settings?.config?.author || "",
        [propertyId]: color,
      },
      miscelanous: {
        ...settings?.miscelanous,
        [propertyId]: color,
      },
    });
  };

  const handleFontRange = (value: number[], id: string) => {
    setStyleMap((prev) => ({
      ...prev,
      [id]: { ...prev[id], size: `${value[0]}px` },
    }));
    setSettings({
      ...settings,
      config: {
        ...settings?.config,
        id: settings?.config?.id || "",
        rootNotionPageId: settings?.config?.rootNotionPageId || "",
        rootNotionSpaceId: settings?.config?.rootNotionSpaceId || "",
        name: settings?.config?.name || "",
        domain: settings?.config?.domain || "",
        author: settings?.config?.author || "",
        [id]: `${value[0]}px`,
      },
      miscelanous: {
        ...settings?.miscelanous,
        [id]: `${value[0]}px`,
      },
    });
  };

  useEffect(() => {
    if (
      memoizedSettings?.config?.main_bg ||
      memoizedSettings?.config?.main_text_color ||
      memoizedSettings?.config?.navbar_bg ||
      memoizedSettings?.config?.navbar_text_color ||
      memoizedSettings?.config?.footer_bg ||
      memoizedSettings?.config?.footer_text_color
    ) {
      setStyleMap((prev) => ({
        ...prev,
        main_bg: {
          ...prev.main_bg,
          color: memoizedSettings.config?.["main_bg"],
        },
        main_text_color: {
          ...prev.main_text_color,
          color: memoizedSettings.config?.["main_text_color"],
        },
        navbar_bg: {
          ...prev.navbar_bg,
          color: memoizedSettings.config?.["navbar_bg"],
        },
        navbar_text_color: {
          ...prev.navbar_text_color,
          color: memoizedSettings.config?.["navbar_text_color"],
        },
        footer_bg: {
          ...prev.footer_bg,
          color: memoizedSettings.config?.["footer_bg"],
        },
        footer_text_color: {
          ...prev.footer_text_color,
          color: memoizedSettings.config?.["footer_text_color"],
        },
      }));
    }
  }, []);

  return (
    <Disclosure defaultOpen={false}>
      {({ open }) => (
        <>
          <Disclosure.Button
            as="li"
            className={cn(
              "text-base font-medium text-cloudBurst dark:text-selago",
              "w-full flex justify-between items-start outline-none cursor-pointer p-2 rounded-lg",
              "border border-gray-300 dark:border-navy-700",
              "bg-white dark:bg-navy-800",
            )}
          >
            {title}
            <FiChevronUp
              className={cn(
                "w-5 h-5 transition-transform duration-150 ease-in-out",
                open ? "transform rotate-180" : "",
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel
            className={cn(
              "flex flex-col items-center justify-center gap-y-6 p-4 bg-white dark:bg-navy-800 rounded-md",
            )}
          >
            {componentItems.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between gap-x-2 w-full ",
                )}
              >
                <span className="text-sm">{item.name}</span>
                {item.type === "Color" ? (
                  <button
                    className={cn(
                      "relative border border-gray-300 !p-0 !w-4 !h-4 !rounded-full !cursor-pointer !min-h-4  !flex-grow-0",
                    )}
                    style={{
                      background: styleMap[item.id]?.["color"]
                        ? styleMap[item.id]?.["color"]
                        : `var(${styleMap[item.id]?.["css_var"]})` ||
                          item.color,
                    }}
                    onClick={() => toggle(index)}
                  >
                    {isOpen[index] && (
                      <div
                        className="z-10 absolute right-6 bottom-6"
                        ref={popover}
                      >
                        <HexColorPicker
                          className="z-10"
                          onChange={(newColor) =>
                            handleColorChange(newColor, item.id)
                          }
                          color={styleMap[item.id]?.["color"] || item.color}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    )}
                  </button>
                ) : item.type === "Font" ? (
                  <div className="flex w-3/4 items-center justify-end gap-4">
                    <Slider
                      defaultValue={[
                        parseInt(styleMap[item.id]?.["size"] || "") || 0,
                      ]}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleFontRange(value, item.id)}
                    />
                    <span className="text-sm font-light">
                      {styleMap[item.id]?.["size"] || ""}
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default ColorPickerDropdown;
