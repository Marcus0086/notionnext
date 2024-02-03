import { toast } from "react-toastify";

import { createSite } from "@/lib/actions/site";

import useToast from "./useToast";

const useFormAction = () => {
  const toastOptions = useToast();
  const createSiteAction = async (formData: FormData) => {
    const siteData = await createSite(formData);
    if (!siteData?.id && siteData?.error) {
      toast.error(siteData.error, toastOptions);
    } else {
      toast.success("Site created successfully", toastOptions);
    }
  };

  return {
    action: createSiteAction,
  };
};

export default useFormAction;
