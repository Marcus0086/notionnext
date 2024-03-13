import { toast } from "react-toastify";

import { createSite } from "@/lib/actions/site";
import ActivityLogger from "@/lib/logger";

import useToast from "@/hooks/useToast";

const useFormAction = () => {
  const toastOptions = useToast();
  const createSiteAction = async (formData: FormData) => {
    const siteData = await createSite(formData);
    if (!siteData?.id && siteData?.error) {
      toast.error(siteData.error, toastOptions);
      ActivityLogger.createSite({
        data: {
          site: formData.get("sitename") as string,
          log: `Failed to create site ${formData.get("sitename")}.`,
          error: siteData.error,
        },
      });
    } else {
      toast.success("Site created successfully", toastOptions);
      ActivityLogger.createSite({
        data: {
          site: formData.get("sitename") as string,
          log: `Created site ${formData.get("sitename")} successfully.`,
        },
      });
    }
  };

  return {
    action: createSiteAction,
  };
};

export default useFormAction;
