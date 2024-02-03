const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full flex flex-col items-center justify-center md:flex-row-reverse h-full">
      <section className="justify-center flex w-full md:w-2/3 md:border-r h-full">
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
