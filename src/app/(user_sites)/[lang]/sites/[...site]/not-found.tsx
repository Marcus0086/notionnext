import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-navy-900">
      <AlertTriangleIcon className="h-24 w-24 text-red-500 dark:text-red-400" />
      <h1 className="mt-4 text-4xl font-semibold text-gray-900 dark:text-gray-100">
        Oops! Page not found.
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
        {`The page you're looking for might have been deleted, does not exist, or
        is not yet published.`}
      </p>
      <Link
        className="mt-6 inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        href="/"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

function AlertTriangleIcon(props: { className?: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
