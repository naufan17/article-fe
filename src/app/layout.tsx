import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/provider";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Toaster } from "@/components/ui/sonner";
import "@/app/globals.css";

const inter: NextFontWithVariable = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Article App",
  description: "A simple article app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen w-full bg-white antialiased ${inter.variable} font-sans`}>
        <Providers>
          <Toaster />
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
