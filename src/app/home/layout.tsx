import HomePageNavBar from "@/components/homePageNavBar";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="overflow-hidden">
      <HomePageNavBar />
      {children}
    </main>
  );
}
