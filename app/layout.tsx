import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from '@/components/ui/sonner'
import { ReduxProvider } from "@/components/ReduxProvider";

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
                <ReduxProvider>
                    {children}
                    <Toaster
                        theme="dark"
                        position="bottom-right"
                        gap={8}
                        toastOptions={{
                            classNames: {
                                toast: "!bg-[#16161f] !border !border-white/10 !text-white/90 !shadow-2xl !rounded-2xl !font-medium",
                                title: "!text-white/90 !text-sm !font-semibold",
                                description: "!text-white/40 !text-xs",
                                success: "!border-emerald-500/25 [&>[data-icon]]:!text-emerald-400",
                                error: "!border-rose-500/25 [&>[data-icon]]:!text-rose-400",
                                icon: "!mr-3",
                            },
                        }}
                    />
                </ReduxProvider>
            </body>
        </html>
    );
}
