import NextTopLoader from "nextjs-toploader";

import AuthContext from "@/components/authContext";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextTopLoader showSpinner={false} />
      <AuthContext>
        <section className="w-full h-full p-6 flex">
          <main className="w-full relative overflow-hidden border rounded-2xl drop-shadow-xl">
            {children}
          </main>
        </section>
      </AuthContext>
    </>
  );
};

export default SiteLayout;
