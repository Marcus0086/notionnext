import NextTopLoader from "nextjs-toploader";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextTopLoader showSpinner={false} />
      <main className="w-full h-screen relative overflow-auto">{children}</main>
    </>
  );
};

export default SiteLayout;
