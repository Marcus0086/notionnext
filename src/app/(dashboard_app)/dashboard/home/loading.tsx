import LoadingCard from "@/components/dashboard/loadingCard";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full gap-4 mt-4">
      {[1, 2, 3].map((_, id) => (
        <LoadingCard key={id} />
      ))}
    </div>
  );
};

export default Loading;
