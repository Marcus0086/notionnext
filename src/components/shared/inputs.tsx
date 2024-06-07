"use client";

import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
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
import {
  FooterIconType,
  FooterStyle,
  NavigationStyle,
  VisibilityFilter,
} from "@prisma/client";
import { z } from "zod";
import { RiLoader4Line } from "react-icons/ri";
import { MdError } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

import { ALERT_MESSAGES, GOOGLE_FONTS } from "@/components/dashboard/constants";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import AlertBox from "@/components/shared/alertBox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useParentPageSettings } from "@/context/parentPage";

import { cn } from "@/lib/utils";
import { SettingsReducer } from "@/lib/reducers/input";
import { deleteSiteById } from "@/lib/actions/site";
import { revalidateSite } from "@/lib/siteDb";
import ActivityLogger from "@/lib/logger";
import { customDomainSchema } from "@/lib/validators/domains";
import {
  addCustomDomain,
  deleteCustomDomain,
  domainVerification,
} from "@/lib/actions/domains";
import { IconsFactory } from "@/lib/factories/icon";

import useToast from "@/hooks/useToast";

import { CardInputComponent, Icons } from "@/types";
import { FooterIcon } from "@/types/footer";

const NameInput = ({
  value,
  disabled = true,
  className,
  onChange,
  name,
  type = "text",
  placeholder,
}: {
  value?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: "text" | "textarea";
  placeholder?: string;
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
          placeholder={placeholder}
          name={name}
          className={cn(
            disabled ? "text-gray-700" : "",
            "w-full h-10 p-2 text-xs rounded-md border border-gray-300 bg-transparent focus:outline-none",
            className || "",
          )}
        />
      );
    case "textarea":
      return (
        <textarea
          value={value}
          disabled={disabled}
          onChange={handleTextArea}
          placeholder={placeholder}
          name={name}
          className={cn(
            "w-full h-40 p-2 text-xs rounded-md border border-gray-300 bg-transparent focus:outline-none",
            className || "",
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
    const optionsSet = new Set([
      ...options.filter((option) => option !== value && option),
      value,
    ]);
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
                  "capitalize",
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

const NavTypeInput = ({ value }: CardInputComponent) => {
  const { setSettings } = useParentPageSettings();
  const { data: session } = useSession();

  const setSelectedNavType = (value: string) => {
    setSettings((settings) => ({
      ...settings,
      miscelanous: {
        ...settings?.miscelanous,
        navigationStyle: value as NavigationStyle,
      },
      config: {
        ...settings?.config,
        id: settings?.config?.id || "",
        rootNotionPageId: settings?.config?.rootNotionPageId || "",
        rootNotionSpaceId: settings?.config?.rootNotionSpaceId || "",
        name: settings?.config?.name || "",
        domain: settings?.config?.domain || "",
        author: settings?.config?.author || "",
        navigationStyle: value as NavigationStyle,
      },
    }));
  };
  return (
    <DropDownInput
      value={value}
      options={[
        "custom",
        "default",
        "hidden",
        session?.user.role === "ADMIN" ? "shared" : "",
      ]}
      onChange={setSelectedNavType}
    />
  );
};

const FooterTypeInput = ({ value }: CardInputComponent) => {
  const { setSettings } = useParentPageSettings();
  const { data: session } = useSession();

  const setSelectedFooterType = (value: string) => {
    setSettings((settings) => ({
      ...settings,
      miscelanous: {
        ...settings?.miscelanous,
        footerStyle: value as FooterStyle,
      },
      config: {
        ...settings?.config,
        id: settings?.config?.id || "",
        rootNotionPageId: settings?.config?.rootNotionPageId || "",
        rootNotionSpaceId: settings?.config?.rootNotionSpaceId || "",
        name: settings?.config?.name || "",
        domain: settings?.config?.domain || "",
        author: settings?.config?.author || "",
        footerStyle: value as FooterStyle,
      },
    }));
  };
  return (
    <DropDownInput
      value={value}
      options={[
        "none",
        "custom",
        session?.user.role === "ADMIN" ? "shared" : "",
      ]}
      onChange={setSelectedFooterType}
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
        "rounded-lg bg-transparent",
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
      const isDeleted = await deleteSiteById(siteId);
      const domain =
        isDeleted?.data?.customDomain || isDeleted?.data?.subDomain || "";
      if (isDeleted.success) {
        toast.info("Site deleted successfully!", toastOptions);
        ActivityLogger.deleteSite({
          data: {
            site: domain || "",
            log: `Deleted site ${domain} successfully.`,
          },
        });
        if (isDeleted?.data?.customDomain) {
          await revalidateSite(isDeleted.data.customDomain);
        }

        if (isDeleted?.data?.subDomain) {
          await revalidateSite(isDeleted.data.subDomain);
        }
        setIsDeleting(false);
        return {
          success: true,
        };
      } else {
        toast.error("Something went wrong!", toastOptions);
        ActivityLogger.deleteSite({
          data: {
            site: domain || "",
            log: `Failed to delete site ${domain}.`,
            error: "Something went wrong!",
          },
        });
        return {
          success: false,
        };
      }
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
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : "",
            )}
            disabled={isButtonDisabled}
          >
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertBox
          title={ALERT_MESSAGES["DeleteSite"].title}
          description={ALERT_MESSAGES["DeleteSite"].description}
          continueAction={() => {
            handleSubmit().then((deletedData) => {
              if (deletedData?.success) {
                router.push("/home");
              }
            });
          }}
        />
      </div>
    </AlertDialog>
  );
};

const InputAdd = ({ value }: CardInputComponent) => {
  const toastOptions = useToast();
  const { settings } = useParentPageSettings();

  const cardRef = useRef<HTMLDivElement>(null);
  const [textValue, setTextValue] = useState(value);
  const [isCustomDomainAdded, setIsCustomDomainAdded] = useState(
    !!value || false,
  );
  const [cardContent, setCardContent] = useState<{
    description: string;
    icon: string;
    recordType?: string;
    expectedValue?: string;
  }>({
    description: "Checking domain status",
    icon: "loading",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleAdd = async () => {
    try {
      if (textValue) {
        await customDomainSchema.parseAsync(textValue);
        const customDomainUpdatedData = await addCustomDomain(
          textValue,
          settings?.site?.id || "",
        );
        if (!customDomainUpdatedData) {
          toast.error(
            "Error adding custom domain. Please try again later.",
            toastOptions,
          );
          return;
        }
        setIsCustomDomainAdded(true);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(`${error.errors[0].message} "${textValue}"`, toastOptions);
      } else {
        toast.error("Error adding custom domain", toastOptions);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCustomDomain(settings?.site?.id || "");
      setTextValue("");
      setIsCustomDomainAdded(false);
    } catch (error) {
      console.error("Error deleting custom domain", error);
      toast.error("Error deleting custom domain", toastOptions);
    }
  };

  const getDomainStatus = useCallback(async () => {
    if (textValue) {
      const domainStatus = await domainVerification(textValue);
      if (!domainStatus.verified) {
        setCardContent({
          expectedValue: domainStatus.expectedValue,
          recordType: domainStatus.recordType,
          description: "Domain is pending verification",
          icon: "error",
        });
      } else {
        setCardContent({
          description: "Domain verified",
          icon: "success",
        });
      }
    }
  }, [textValue]);

  const handleRefresh = async () => {
    setCardContent({
      description: "Checking domain status",
      icon: "loading",
    });
    await getDomainStatus();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current && isCustomDomainAdded) {
        getDomainStatus();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [getDomainStatus, isCustomDomainAdded]);
  return (
    <>
      <div className="flex items-center justify-center gap-x-2 w-full">
        <NameInput
          value={textValue}
          disabled={isCustomDomainAdded || false}
          onChange={handleChange}
          placeholder="mysite.com"
          name="custom-domain"
        />
        <Button
          onClick={handleAdd}
          disabled={isCustomDomainAdded || !textValue}
          variant="secondary"
          className="w-1/4 h-10 rounded-md bg-blue-600 hover:bg-blue-700 !text-white"
        >
          Add
        </Button>
      </div>
      {isCustomDomainAdded ? (
        <Card ref={cardRef} className="w-full dark:bg-navy-900">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-cloudBurst dark:text-white">
              {textValue}
            </CardTitle>
            <CardDescription className="text-xs text-gray-700 flex items-center justify-start w-full gap-x-2">
              {cardContent.icon === "loading" ? (
                <RiLoader4Line className={cn("w-4 h-4", "animate-spin")} />
              ) : cardContent.icon === "error" ? (
                <MdError className="w-4 h-4 text-red-500" />
              ) : cardContent.icon === "success" ? (
                <FaRegCheckCircle className="w-4 h-4 text-green-500" />
              ) : null}
              {cardContent.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {cardContent.recordType && cardContent.expectedValue ? (
              <>
                <CardDescription className="text-xs text-gray-700">
                  Please add the following configuration to your DNS record to
                  verify your domain.
                </CardDescription>
                <table className="table-auto w-full mt-2 bg-black text-gray-500 text-xs rounded-md">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 font-semibold">Type</th>
                      <th className="px-4 py-2 font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2">{cardContent.recordType}</td>
                      <td className="px-4 py-2">{cardContent.expectedValue}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            ) : null}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              disabled={
                cardContent.icon === "loading" || cardContent.icon === "success"
              }
              onClick={handleRefresh}
              variant="outline"
            >
              Refresh
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  disabled={cardContent.icon === "loading"}
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertBox
                title={"Are you sure you want to delete this domain?"}
                description={"This action cannot be undone."}
                continueAction={handleDelete}
              />
            </AlertDialog>
          </CardFooter>
        </Card>
      ) : null}
    </>
  );
};

const SocialLinksAddInput = ({ value }: { value?: any }) => {
  const toastOptions = useToast();
  const { settings, setSettings } = useParentPageSettings();
  const Delete = IconsFactory.getIcon("delete");
  const socialIcons = useMemo(() => IconsFactory.getSocialIcons(), []);
  const [currentIcon, setCurrentIcon] = useState<FooterIconType>();
  const [icons, setIcons] = useState<FooterIcon[]>([...(value || [])]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const handleValueChange = (value: FooterIconType) => {
    setCurrentIcon(value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const formAction = async (data: FormData) => {
    if (!currentIcon) {
      toast.error("Please select an icon", toastOptions);
      return;
    }
    const icon = {
      icon: currentIcon,
      title: title || currentIcon.toString(),
      url,
    };
    if (
      settings?.config?.footerIcons?.some(
        (existingIcon) => existingIcon.title === icon.title,
      )
    ) {
      toast.error("An icon with same title already exists", toastOptions);
      return;
    }
    setIcons((icons) => [...icons, icon]);
    setSettings((settings) => ({
      ...settings,
      miscelanous: {
        ...settings?.miscelanous,
      },
      config: {
        ...settings?.config,
        id: settings?.config?.id || "",
        rootNotionPageId: settings?.config?.rootNotionPageId || "",
        rootNotionSpaceId: settings?.config?.rootNotionSpaceId || "",
        name: settings?.config?.name || "",
        domain: settings?.config?.domain || "",
        author: settings?.config?.author || "",
        footerIcons: [...(settings?.config?.footerIcons || []), icon],
      },
    }));
    setTitle("");
    setUrl("");
    setCurrentIcon(undefined);
    setOpen(false);
  };

  const handleDelete = (title: string) => {
    setIcons((icons) => icons.filter((icon) => icon.title !== title));
    setSettings((settings) => ({
      ...settings,
      miscelanous: {
        ...settings?.miscelanous,
      },
      config: {
        ...settings?.config,
        id: settings?.config?.id || "",
        rootNotionPageId: settings?.config?.rootNotionPageId || "",
        rootNotionSpaceId: settings?.config?.rootNotionSpaceId || "",
        name: settings?.config?.name || "",
        domain: settings?.config?.domain || "",
        author: settings?.config?.author || "",
        footerIcons: settings?.config?.footerIcons?.filter(
          (icon) => icon.title !== title,
        ),
      },
    }));
  };
  return (
    <>
      <div className="flex items-center justify-center gap-x-2 w-full">
        <Select onValueChange={handleValueChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an Icon" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select an Icon</SelectLabel>
              {socialIcons.map((icon, index) => {
                const Icon = IconsFactory.getIcon(icon);
                return (
                  <SelectItem key={index} value={icon}>
                    <div className="flex items-center justify-start w-full gap-4">
                      <Icon className="w-5 h-5" />
                      {icon}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="w-1/4 h-10 rounded-md bg-blue-600 hover:bg-blue-700 !text-white"
            >
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Icon</DialogTitle>
              <DialogDescription>
                Add Title and Url for your icon
              </DialogDescription>
            </DialogHeader>
            <form action={formAction}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="url" className="text-right">
                    URL
                  </Label>
                  <Input
                    id="url"
                    value={url}
                    onChange={handleUrlChange}
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="flex flex-col w-full items-center justify-center gap-4">
        {icons.map((icon, index) => {
          const Icon = IconsFactory.getIcon(icon.icon);
          return (
            <li
              key={index}
              className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-lg bg-transparent dark:border-gray-700 dark:bg-navy-900"
            >
              <a
                href={icon.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs flex items-center justify-center gap-2"
              >
                <Icon className="w-5 h-5" />
                {icon.title}
              </a>
              <Button
                onClick={() => handleDelete(icon.title)}
                variant="ghost"
                className="rounded-md"
              >
                <Delete className="w-5 h-5 text-red-400" />
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const FooterNoteInput = ({ value }: CardInputComponent) => {
  const [textValue, setTextValue] = useState(value);
  const { settings, setSettings } = useParentPageSettings();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
    setSettings((settings) => ({
      ...settings,
      miscelanous: {
        ...settings?.miscelanous,
        footer_footnote: e.target.value,
      },
      config: {
        ...settings?.config,
        id: settings?.config?.id || "",
        rootNotionPageId: settings?.config?.rootNotionPageId || "",
        rootNotionSpaceId: settings?.config?.rootNotionSpaceId || "",
        name: settings?.config?.name || "",
        domain: settings?.config?.domain || "",
        author: settings?.config?.author || "",
        footer_footnote: e.target.value,
      },
    }));
  };
  return (
    <>
      <NameInput
        value={textValue}
        disabled={settings?.config?.footerStyle !== "custom" || false}
        onChange={handleChange}
        name="footernote"
      />
    </>
  );
};

const FooterTitleInput = ({ value }: CardInputComponent) => {
  const [textValue, setTextValue] = useState(value);
  const { settings, setSettings } = useParentPageSettings();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
    setSettings((settings) => ({
      ...settings,
      miscelanous: {
        ...settings?.miscelanous,
        footer_title: e.target.value,
      },
      config: {
        ...settings?.config,
        id: settings?.config?.id || "",
        rootNotionPageId: settings?.config?.rootNotionPageId || "",
        rootNotionSpaceId: settings?.config?.rootNotionSpaceId || "",
        name: settings?.config?.name || "",
        domain: settings?.config?.domain || "",
        author: settings?.config?.author || "",
        footer_title: e.target.value,
      },
    }));
  };
  return (
    <>
      <NameInput
        value={textValue}
        disabled={settings?.config?.footerStyle !== "custom" || false}
        onChange={handleChange}
        name="footertitle"
      />
    </>
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
  InputAdd,
  NavTypeInput,
  FooterTypeInput,
  FooterNoteInput,
  FooterTitleInput,
  SocialLinksAddInput,
};
