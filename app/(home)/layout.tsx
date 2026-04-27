
import type { Metadata } from "next";
import Header from "@/components/sections/Header/Header";
import Footer from "@/components/sections/Footer";


export const metadata: Metadata = {
  title: "Tasko | Smart Task Management",
  description: "Tasko | The Full stack task management application build with nextjs",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <Header />
      </div>
      {children}
      <Footer />
    </>
  );
}
