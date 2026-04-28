import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from '@/components/ui/sonner'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
    title: "Tasko | Smart Task Management",
    description: "Tasko | The Full stack task management application build with nextjs",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            data-scroll-behavior="smooth"
            className={cn("h-full", "antialiased", "font-sans", montserrat.variable)}
        >
            <body className="min-h-full flex flex-col dark">
                {children}
                <Toaster />
            </body>
        </html>
    );
}
