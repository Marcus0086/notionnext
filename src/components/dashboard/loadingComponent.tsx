const LoadingComponent = () => {
  return (
    <div className="w-full h-screen bg-gray-100 dark:bg-navy-900">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-64 h-16 bg-gray-300 dark:bg-gray-900 animate-pulse rounded-md" />
        <div className="mt-8 w-full max-w-md space-y-4">
          <div className="h-12 bg-gray-300 dark:bg-gray-900 animate-pulse rounded-md" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="h-40 bg-gray-300 dark:bg-gray-900 animate-pulse rounded-md" />
            <div className="h-40 bg-gray-300 dark:bg-gray-900 animate-pulse rounded-md" />
            <div className="h-40 bg-gray-300 dark:bg-gray-900 animate-pulse rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
