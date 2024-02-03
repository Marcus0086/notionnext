import Link from "next/link";

import InputField from "@/components/auth/inputField";

import { createUser } from "@/lib/actions/auth";

const EmailForm = () => {
  return (
    <form
      action={createUser}
      className="w-full max-w-[420px] flex flex-col justify-center items-start text-start font-normal px-5 md:px-0"
    >
      <InputField
        label="Email*"
        htmlFor="user_email"
        type="email"
        id="user_email"
      />
      <InputField
        label="Password*"
        htmlFor="user_password"
        type="password"
        id="user_password"
      />
      <div className="flex items-center justify-between w-full px-2 mt-3">
        <div className="flex items-center justify-center gap-x-2">
          <input
            type="checkbox"
            id="user_remember_me"
            name="user_remember_me"
            value="1"
            className="rounded-md border-gray-300 border border-solid dark:bg-navy-900 outline-rockBlue"
          />
          <label
            htmlFor="user_remember_me"
            className="text-cloudBurst dark:text-white text-xs cursor-pointer"
          >
            Keep me logged In
          </label>
        </div>
        <Link
          href="/password/forgot"
          className="text-brand-500 dark:text-selago text-xs"
        >
          Forgot Password?
        </Link>
      </div>
      <button
        type="submit"
        className="bg-brand-500 dark:bg-deepBlue text-white text-center rounded-xl py-3 md:px-44 mt-6 w-full"
      >
        Sign In
      </button>
      <div className="flex items-center justify-start mt-4 gap-x-1">
        <h3 className="text-cloudBurst dark:text-white text-xs">
          Not registered yet?
        </h3>
        <Link
          href="/register"
          className="text-brand-500 dark:text-selago text-xs"
        >
          Create an account
        </Link>
      </div>
    </form>
  );
};

export default EmailForm;
