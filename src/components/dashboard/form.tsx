"use client";

import { useSession } from "next-auth/react";

import FormSubmitButton from "@/components/shared/formSubmitButton";

import useFormAction from "@/hooks/useFormAction";

const CreateSiteForm = () => {
  const { action } = useFormAction();
  const { data } = useSession();
  return (
    <form
      action={action}
      className="flex flex-col items-start justify-center py-10 px-8 md:py-12 md:px-16 font-normal antialiased"
    >
      {/* TODO: Ask chatgpt for a better copy text */}
      <h1 className="relative z-10 text-4xl sm:text-5xl leading-[1.25] md:text-6xl md:leading-[1.25]  bg-clip-text text-transparent bg-gradient-to-b from-[#1F1F1F] to-neutral-500 dark:from-neutral-200 dark:to-neutral-600 text-center font-sans font-bold">
        Create Extraordinary WebSites
      </h1>
      <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
        Enter in the creative world of NotionSite.io and build your own No-code
        websites in just seconds.
      </p>
      <div className="mx-auto flex flex-col items-start justify-center w-full md:w-3/4 mt-4 text-base z-10">
        <label htmlFor="sitename" className="text-xs m-1">
          Name
        </label>
        <input
          type="text"
          name="sitename"
          id="sitename"
          placeholder="notionnext"
          required
          className="outline-none text-cloudBurst dark:text-white rounded-xl py-2 px-4 w-full sm:w-2/4 bg-selago dark:bg-blueZodiac/40"
        />
        <label htmlFor="url" className="m-1 mt-4 text-xs">
          URL
        </label>
        <input
          type="text"
          name="url"
          id="url"
          placeholder="https://example.notion.site/xyz"
          required
          className="w-full outline-none text-cloudBurst dark:text-white rounded-xl py-2 px-4 bg-selago dark:bg-blueZodiac/40"
        />
        <div className="flex items-center justify-center gap-x-4 mt-5">
          <FormSubmitButton>Create</FormSubmitButton>
          {data?.user?.accountType !== "FREE" ? (
            <div className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-400 rounded-xl">
              <label
                htmlFor="toggle"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Private Pages
              </label>
              <input type="checkbox" name="toggle" />
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default CreateSiteForm;
