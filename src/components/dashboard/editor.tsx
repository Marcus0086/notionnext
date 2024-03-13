"use client";

import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import MonacoEditor from "@monaco-editor/react";

import LoadingComponent from "@/components/dashboard/loadingComponent";
import { FILES } from "@/components/dashboard/constants";

import { cn } from "@/lib/utils";

import useEditor from "@/hooks/useEditor";

const Editor = () => {
  const { handleInputChange, handleMount, values, theme } = useEditor();

  return (
    <Tab.Group>
      <div className="flex flex-col items-center justify-between h-full">
        <Tab.List as={Fragment}>
          <ul className="flex w-full items-center justify-center space-x-2 rounded-xl bg-blueZodiac dark:bg-navy-700 p-1">
            {FILES.map(({ defaultLanguage }, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  cn(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white",
                    "transition-colors duration-100 ease-in-out",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 outline-none",
                    selected
                      ? "bg-blueZodiac/40 shadow"
                      : "hover:bg-white/[0.12] text-white"
                  )
                }
              >
                <h3 className="uppercase">{defaultLanguage}</h3>
              </Tab>
            ))}
          </ul>
        </Tab.List>
        <Tab.Panels as={Fragment}>
          {FILES.map(({ path, defaultLanguage, content }, idx) => (
            <Tab.Panel
              key={idx}
              className="h-full w-full border rounded-md border-opacity-30 border-selago mt-2
                                dark:border-gray-400 md:ml-auto overflow-hidden"
            >
              <MonacoEditor
                defaultLanguage={defaultLanguage}
                path={path}
                theme={theme === "dark" ? "vs-dark" : "light"}
                value={values[defaultLanguage]}
                onChange={(value) => handleInputChange(value, defaultLanguage)}
                defaultValue={content}
                onMount={handleMount}
                loading={<LoadingComponent />}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

export default Editor;
