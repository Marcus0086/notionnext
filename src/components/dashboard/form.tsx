"use client";

import FormSubmitButton from "../shared/formSubmitButton";

import useFormAction from "@/hooks/useFormAction";

const CreateSiteForm = () => {
  const { action } = useFormAction();

  return (
    <form
      action={action}
      className="flex flex-col items-start justify-center py-10 px-8 md:py-12 md:px-16 font-normal text-white"
    >
      {/* TODO: Ask chatgpt for a better copy text */}
      <h3 className="w-2/4 text-3xl">
        Create and share extraordinary No-code websites
      </h3>
      <h3 className="w-2/4 text-base mt-3">
        Enter in the creative world of NotionSite.io and build your own No-code
        websites in just seconds.
      </h3>
      <div className="flex flex-col items-start justify-center w-full md:w-2/3 mt-4 text-base">
        <label htmlFor="sitename">Name</label>
        <input
          type="text"
          name="sitename"
          id="sitename"
          placeholder="My Awesome Site"
          required
          className="outline-none text-cloudBurst dark:text-white rounded-xl py-2 px-4 w-full sm:w-2/4"
        />
        <label htmlFor="url" className="mt-2">
          URL
        </label>
        <input
          type="text"
          name="url"
          id="url"
          placeholder="https://example.notion.site/xyz"
          required
          className="w-full outline-none text-cloudBurst dark:text-white rounded-xl py-2 px-4"
        />
        <FormSubmitButton>Create</FormSubmitButton>
      </div>
    </form>
  );
};

export default CreateSiteForm;
