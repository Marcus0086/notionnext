import NextTopLoader from "nextjs-toploader";

import AuthContext from "@/components/authContext";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextTopLoader showSpinner={false} />
      <AuthContext>
        <main className="w-full h-full p-2 md:p-6">{children}</main>
      </AuthContext>
    </>
  );
};

export default SiteLayout;
