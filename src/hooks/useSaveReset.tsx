import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";

import { useParentPageSettings } from "@/context/parentPage";

import useToast from "@/hooks/useToast";
import useCleanCss from "@/hooks/useCleanCss";
import { saveSiteData } from "@/lib/actions/site";

const useSaveReset = (siteId: string) => {
  const [saving, setSaving] = useState(false);
  const { settings, setSettings } = useParentPageSettings();
  const toastOptions = useToast();
  const cleanCss = useCleanCss();

  const [prevSettings, setPrevSettings] = useState(settings);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (
      JSON.stringify(prevSettings) !== JSON.stringify(settings) &&
      !isVisible
    ) {
      setIsVisible(true);
      setPrevSettings(settings);
    }
  }, [isVisible, prevSettings, settings]);

  const handleDefaultSave = useCallback(async () => {
    setSaving(true);
    const css = settings?.site?.css || "";
    try {
      const values = {
        css: cleanCss(css),
      };
      const data = await saveSiteData(siteId, values);
      if (data && data.site?.id) {
        toast.success("Settings Saved successfully!", toastOptions);
      }
    } catch (error) {
      console.error("Settings save error:", error);
      toast.error("Error in saving settings!", toastOptions);
    } finally {
      setSaving(false);
    }
  }, [cleanCss, settings?.site?.css, siteId, toastOptions]);

  const handleDefaultReset = () => {
    if (settings?.site) {
      setSettings({
        ...settings,
        site: {
          ...settings?.site,
          css: "",
        },
        miscelanous: {},
      });
    }
  };

  return {
    handleDefaultReset,
    handleDefaultSave,
    saving,
    isVisible,
  };
};

export default useSaveReset;
