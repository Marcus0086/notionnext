"use client";

import { Fragment, useMemo, useReducer, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  AiOutlineCheckSquare,
  AiOutlineCloudUpload,
  AiFillCheckSquare,
} from "react-icons/ai";
import { IoChevronUp } from "react-icons/io5";
import { RxNotionLogo } from "react-icons/rx";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { VisibilityFilter } from "@prisma/client";

import { ALERT_MESSAGES, GOOGLE_FONTS } from "@/components/dashboard/constants";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import AlertBox from "@/components/shared/alertBox";

import { useParentPageSettings } from "@/context/parentPage";

import { cn } from "@/lib/utils";
import { SettingsReducer } from "@/lib/reducers/input";
import { deleteSiteById } from "@/lib/actions/site";
import { revalidateSite } from "@/lib/siteDb";

import useToast from "@/hooks/useToast";

import { CardInputComponent } from "@/types";

const NameInput = ({
  value,
  disabled = true,
  className,
  onChange,
  name,
  type = "text",
}: {
  value?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: "text" | "textarea";
}) => {
  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e as unknown as React.ChangeEvent<HTMLInputElement>);
  };
  switch (type) {
    case "text":
      return (
        <input
          type="text"
          value={value}
          disabled={disabled}
          onChange={onChange}
          name={name}
          className={cn(
            "w-full h-10 p-2 text-xs rounded-md border border-gray-300 bg-transparent focus:outline-none",
            className || ""
          )}
        />
      );
    case "textarea":
      return (
        <textarea
          value={value}
          disabled={disabled}
          onChange={handleTextArea}
          name={name}
          className={cn(
            "w-full h-40 p-2 text-xs rounded-md border border-gray-300 bg-transparent focus:outline-none",
            className || ""
          )}
        />
      );
    default:
      return null;
  }
};

const OpenTextInput = ({ value }: { value?: string }) => {
  const [textValue, setTextValue] = useState(value);
  const { setSettings } = useParentPageSettings();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
    setSettings((settings) => ({
      ...settings,
      miscelanous: {
        ...settings?.miscelanous,
        name: e.target.value,
      },
    }));
  };
  return (
    <NameInput
      value={textValue}
      disabled={false}
      onChange={handleChange}
      name="opentext"
    />
  );
};

const TextAreaInput = ({ value }: { value?: string }) => {
  const [textValue, setTextValue] = useState(value);
  const { setSettings } = useParentPageSettings();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
    setSettings((settings) => ({
      ...settings,
      miscelanous: {
        ...settings?.miscelanous,
        description: e.target.value,
      },
    }));
  };
  return (
    <NameInput
      value={textValue}
      disabled={false}
      onChange={handleChange}
      type="textarea"
      name="opentext"
    />
  );
};

const UrlInput = ({ value }: { value?: string }) => {
  return (
    <p className="flex items-center justify-center w-full h-10 p-2 text-xs rounded-md border border-gray-300 bg-transparent focus:outline-none whitespace-nowrap">
      <RxNotionLogo className="w-4 h-4 mr-2" />
      <a
        href={value || ""}
        target="_blank"
        rel="noreferrer"
        className="overflow-x-auto no-scroll"
      >
        {value}
      </a>
    </p>
  );
};

const DropDownInput = ({
  value,
  options,
  onChange,
}: {
  value?: string;
  options: string[];
  onChange: (value: string) => void;
}) => {
  const values = useMemo(() => {
    const optionsSet = new Set([...options, value]);
    return [...optionsSet];
  }, [value, options]);

  const [{ selectedValue }, dispatch] = useReducer(SettingsReducer, {
    selectedValue: value || options[0],
  });

  const handleOnChange = (value: string) => {
    dispatch({
      type: "SET_SELECTED_VALUE",
      payload: value,
    });
    onChange(value);
  };

  return (
    <Listbox value={selectedValue} onChange={handleOnChange}>
      <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-transparent py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <h3 className="block capitalize truncate text-base font-normal text-cloudBurst dark:text-white">
          {selectedValue}
        </h3>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <IoChevronUp className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="flex flex-col items-start w-full gap-y-2">
          {values.map((value, index) => (
            <Listbox.Option
              key={index}
              value={value}
              className={({ active }) =>
                cn(
                  "flex items-center justify-start gap-x-4 cursor-pointer select-none pl-3 w-full rounded-md",
                  active ? "bg-selago dark:bg-blueZodiac" : "",
                  "capitalize"
                )
              }
            >
              {({ selected }) => (
                <>
                  {!selected ? (
                    <AiOutlineCheckSquare className="w-4 h-4" />
                  ) : (
                    <AiFillCheckSquare className="w-4 h-4" />
                  )}
                  {value || ""}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

const FontInput = ({ value }: CardInputComponent) => {
  const { settings, setSettings } = useParentPageSettings();

  const setSelectedFont = (value?: string) => {
    setSettings({
      ...settings,
      site: {
        ...settings?.site,
        userId: settings?.site?.userId || "",
        id: settings?.site?.id || "",
        notionAuthToken: settings?.site?.notionAuthToken || "",
        notionUserId: settings?.site?.notionUserId || "",
        name: settings?.site?.name || "",
        rootNotionPageId: settings?.site?.rootNotionPageId || "",
        rootNotionSpaceId: settings?.site?.rootNotionSpaceId || "",
        fontFamily: value,
      },
      miscelanous: {
        ...settings?.miscelanous,
        fontFamily: value || "default",
      },
    });
  };
  return (
    <DropDownInput
      value={value}
      options={GOOGLE_FONTS}
      onChange={setSelectedFont}
    />
  );
};

const VisibilityInput = ({ value }: CardInputComponent) => {
  const { setSettings } = useParentPageSettings();
  const setSelectedVisibility = (value: string) => {
    setSettings((settings) => ({
      ...settings,
      miscelanous: {
        ...settings?.miscelanous,
        visibility: value as VisibilityFilter,
      },
    }));
  };
  return (
    <DropDownInput
      value={value}
      options={Object.keys(VisibilityFilter)}
      onChange={setSelectedVisibility}
    />
  );
};

const MediaInput = ({ value }: CardInputComponent) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full px-3 py-6 text-center",
        "border-2 border-gray-300 border-dashed",
        "rounded-lg bg-transparent"
      )}
    >
      <label htmlFor="dropzone-file" className="cursor-pointer">
        <div className="flex flex-col items-center justify-center">
          <AiOutlineCloudUpload className="w-8 h-8 text-gray-600" />
          <p className="mb-2 text-sm text-gray-600 mt-4">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-600">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
};

const DeleteInput = ({ value: siteId }: CardInputComponent) => {
  const toastOptions = useToast();
  const router = useRouter();
  const [{ deleteValue: value }, dispatch] = useReducer(SettingsReducer, {
    deleteValue: "",
  });

  const isButtonDisabled = useMemo(() => value != "Delete My Site", [value]);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "DELETE_SITE",
      payload: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (siteId) {
      setIsDeleting(true);
      const response = await deleteSiteById(siteId);
      await revalidateSite(response?.domain || "");
      toast.info("Site deleted successfully!", toastOptions);
      setIsDeleting(false);
      setTimeout(() => {
        router.push("/home");
      }, 200);
    }
  };
  return (
    <AlertDialog>
      <div className="flex flex-col items-start justify-center w-full">
        <label htmlFor="delete-site" className="text-sm text-gray-600">
          Type
          <span className="font-bold">{" Delete My Site"}</span> to delete this
          site
        </label>
        <NameInput
          value={value}
          disabled={false}
          onChange={handleChange}
          name="delete-site"
          className="border border-red-500 my-2"
        />
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className={cn(
              "w-full h-10 rounded-xl",
              isDeleting ? "animate-pulse cursor-not-allowed" : "",
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            )}
            disabled={isButtonDisabled}
          >
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertBox
          title={ALERT_MESSAGES["DeleteSite"].title}
          description={ALERT_MESSAGES["DeleteSite"].description}
          continueAction={handleSubmit}
        />
      </div>
    </AlertDialog>
  );
};

export {
  NameInput,
  UrlInput,
  FontInput,
  MediaInput,
  VisibilityInput,
  DeleteInput,
  OpenTextInput,
  TextAreaInput,
};
