import NextTopLoader from "nextjs-toploader";

import AuthContext from "@/components/authContext";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextTopLoader showSpinner={false} />
      <AuthContext>
        <main className="w-full h-screen relative overflow-auto">
          {children}
        </main>
      </AuthContext>
    </>
  );
};

export default SiteLayout;
