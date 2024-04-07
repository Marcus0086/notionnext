import { Dispatch, useReducer, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { RiLoader4Line } from "react-icons/ri";

import { useParentPageSettings } from "@/context/parentPage";
import useToast from "@/hooks/useToast";
import { httpPrefix, domainSuffix } from "@/lib/config";
import { cn } from "@/lib/utils";
import { revalidateSite } from "@/lib/siteDb";
import { IconsFactory } from "@/lib/factories/icon";
import ActivityLogger from "@/lib/logger";

import { Display, Icons, ProviderPageProps } from "@/types";

const DisplayButton = ({
  children,
  name,
  setDisplay,
  display,
}: {
  children: React.ReactNode;
  name: Display;
  setDisplay: Dispatch<Display>;
  display: Display;
}) => {
  return (
    <button
      onClick={() => setDisplay(name)}
      className={cn(
        "hover:opacity-100",
        display === name ? "opacity-100" : "opacity-50",
      )}
    >
      {children}
    </button>
  );
};

const SettingsNav = ({ pageProps }: { pageProps?: ProviderPageProps }) => {
  const site = pageProps?.site;
  const siteUrl = !site
    ? undefined
    : site?.customDomain
      ? `${site.customDomain}`
      : `${site?.name}.${domainSuffix}`;

  const subDomainUrl =
    !site || !site?.name ? undefined : `${site.name}.${domainSuffix}`;
  const customDomainUrl =
    !site || !site?.customDomain ? undefined : `${site.customDomain}`;

  const [saved, setSaved] = useState(false);
  const toastOptions = useToast();

  const { settings, setSettings } = useParentPageSettings();

  const handlePublish = async () => {
    setSaved(true);
    try {
      if (subDomainUrl) {
        await revalidateSite(subDomainUrl);
      }
      if (customDomainUrl) {
        await revalidateSite(customDomainUrl);
      }
      ActivityLogger.publishSite({
        data: {
          site: siteUrl || "",
          log: `Published site ${siteUrl} successfully.`,
        },
      });
      toast.success("Site published successfully!", toastOptions);
    } catch (error) {
      console.log("Error is publishing", error);
      ActivityLogger.publishSite({
        data: {
          site: siteUrl || "",
          log: `Failed to publish site ${siteUrl}.`,
          error: "Something went wrong!",
        },
      });
      toast.error("Error in publishing Site!", toastOptions);
    } finally {
      setSaved(false);
    }
  };

  const displayReducer = (state: Display, action: Display) => {
    switch (action) {
      case "mobile":
        setSettings({
          ...settings,
          miscelanous: {
            ...settings.miscelanous,
            display: "mobile",
          },
        });
        return "mobile";
      case "tablet":
        setSettings({
          ...settings,
          miscelanous: {
            ...settings.miscelanous,
            display: "tablet",
          },
        });
        return "tablet";
      case "desktop":
        setSettings({
          ...settings,
          miscelanous: {
            ...settings.miscelanous,
            display: "desktop",
          },
        });
        return "desktop";
      default:
        return state;
    }
  };
  const [display, dispatch] = useReducer(displayReducer, "desktop");

  return (
    <nav
      className="flex items-center justify-between w-full bg-white 
    dark:bg-blueZodiac h-11 px-5 border-b border-gray-300 dark:border-gray-800"
    >
      <div className="flex items-center justify-center gap-x-1">
        {["mobile", "tablet", "desktop"].map((name, index) => {
          const DisplayIcon = IconsFactory.getIcon(name as Icons);
          return (
            <DisplayButton
              key={index}
              name={name as Display}
              display={display}
              setDisplay={dispatch}
            >
              <DisplayIcon className="w-5 h-5" />
            </DisplayButton>
          );
        })}
      </div>
      <div>
        {siteUrl && (
          <Link
            href={`${httpPrefix}${siteUrl}`}
            className="text-center text-sm hover:text-slate-500"
          >
            {siteUrl}
          </Link>
        )}
      </div>
      <div className="flex items-center justify-center gap-x-3">
        <button
          title="Publish your Site"
          onClick={handlePublish}
          className={cn(
            "flex items-center justify-center gap-x-1 text-sm bg-brand-500 text-center px-4 py-1 rounded-md text-white",
            saved ? "opacity-50 cursor-not-allowed" : "",
          )}
        >
          Publish
          <RiLoader4Line
            className={cn("w-4 h-4", saved ? "animate-spin" : "")}
          />
        </button>
      </div>
    </nav>
  );
};

export default SettingsNav;
