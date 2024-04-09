import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { editor } from "monaco-editor";

import { useParentPageSettings } from "@/context/parentPage";

const useEditor = () => {
  const { theme } = useTheme();

  const { settings, setSettings } = useParentPageSettings();

  const [values, setValues] = useState<{
    [key: string]: string;
  }>({
    css: "",
    html: "",
    javascript: "",
  });

  const handleMount = useCallback(
    (editor: editor.IStandaloneCodeEditor | null) => {
      if (values.css || values.javascript) {
        editor?.getAction("editor.action.formatDocument")?.run();
      }
    },
    [values.css, values.javascript],
  );

  useEffect(() => {
    if (
      settings?.site?.css ||
      settings?.site?.javascript ||
      settings?.site?.html
    ) {
      setValues({
        css: settings?.site?.css || "",
        html: settings?.site?.html || "",
        javascript: settings?.site?.javascript || "",
      });
    }
  }, [settings?.site?.css, settings?.site?.html, settings?.site?.javascript]);

  const handleInputChange = useCallback(
    (value?: string, defaultLanguage?: string) => {
      if (settings?.site) {
        switch (defaultLanguage) {
          case "css":
            setSettings({
              ...settings,
              site: {
                ...settings?.site,
                css: value?.trim() || "",
              },
              miscelanous: {
                ...settings?.miscelanous,
                css: value?.trim() || "",
              },
            });
            break;
          case "javascript":
            setSettings({
              ...settings,
              site: {
                ...settings?.site,
                javascript: value?.trim() || "",
              },
              miscelanous: {
                ...settings?.miscelanous,
                javascript: value?.trim() || "",
              },
            });
            break;
          case "html":
            setSettings({
              ...settings,
              site: {
                ...settings?.site,
                html: value?.trim() || "",
              },
              miscelanous: {
                ...settings?.miscelanous,
                html: value?.trim() || "",
              },
            });
            break;
          default:
            break;
        }
      }
      setValues((values) => ({
        ...values,
        [defaultLanguage || "css"]: value?.trim() || "",
      }));
    },
    [setSettings, settings],
  );

  return {
    handleInputChange,
    handleMount,
    values,
    theme,
  };
};

export default useEditor;
