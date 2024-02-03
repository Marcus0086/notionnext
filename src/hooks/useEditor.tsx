import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { editor } from "monaco-editor";
import { toast } from "react-toastify";

import hasher from "@/lib/hash";
import { saveSiteData } from "@/lib/actions/site";

import { useParentPageSettings } from "@/context/parentPage";

import useCleanCss from "@/hooks/useCleanCss";
import useToast from "@/hooks/useToast";

const useEditor = (siteId: string) => {
  const { theme } = useTheme();
  const cleanCss = useCleanCss();

  const { settings, setSettings } = useParentPageSettings();
  const [saved, setSaved] = useState(false);

  const [values, setValues] = useState<{
    [key: string]: string;
  }>({
    html: "",
    css: "",
    javascript: "",
  });

  const [prevHash, setHash] = useState<Promise<string>>();

  const handleMount = useCallback(
    (editor: editor.IStandaloneCodeEditor | null) => {
      if (values.css || values.html || values.javascript) {
        editor?.getAction("editor.action.formatDocument")?.run();
      }
    },
    [values.css, values.html, values.javascript]
  );

  const toastOptions = useToast();

  useEffect(() => {
    if (
      settings?.site?.css ||
      settings?.site?.html ||
      settings?.site?.javascript
    ) {
      setValues({
        html: settings?.site?.html || "",
        css: settings?.site?.css || "",
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
          default:
            break;
        }
      }
      const css = settings?.site?.css || "";
      const html = settings?.site?.html || "";
      const javaScript = settings?.site?.javascript || "";
      const hash = hasher(css + html + javaScript);
      setHash(hash);
      setValues((values) => ({
        ...values,
        [defaultLanguage || "css"]: value?.trim() || "",
      }));
    },
    [setSettings, settings]
  );

  const handleSave = async () => {
    setSaved(true);
    const css = settings?.site?.css || "";
    const html = settings?.site?.html || "";
    const javaScript = settings?.site?.javascript || "";
    const hash = hasher(css + html + javaScript);
    setHash(hash);
    const isNotChanged = (await hash) === (await prevHash);
    if (prevHash === undefined || isNotChanged) {
      toast.info("No changes to save!", toastOptions);
      setSaved(false);
      return;
    }
    try {
      const values = {
        css: cleanCss(css),
        html: html,
        javascript: javaScript,
      };
      const data = await saveSiteData(siteId, values);
      if (data && data.id) {
        toast.success("Settings Saved successfully!", toastOptions);
      }
    } catch (error) {
      toast.error("Error in saving settings!", toastOptions);
    } finally {
      setSaved(false);
    }
  };

  const handleReset = useCallback(() => {
    if (settings?.site) {
      setSettings({
        ...settings,
        site: {
          ...settings?.site,
          html: "",
          css: "",
          javascript: "",
        },
        miscelanous: {
          ...settings?.miscelanous,
          html: "",
          css: "",
          javascript: "",
        },
      });
    }
    setValues((values) => ({
      ...values,
      html: "",
      css: "",
      javascript: "",
    }));
  }, [setSettings, settings]);

  return {
    handleInputChange,
    handleMount,
    handleReset,
    handleSave,
    values,
    saved,
    theme,
  };
};

export default useEditor;
