import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScroll";
import { ShowreelProvider } from "@/components/providers/ShowreelProvider";
import DynamicTitle from "@/components/ui/DynamicTitle";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Amar | Selected Edits",
  description: "Next-level cinematic portfolio of Amar, a professional video editor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${fraunces.variable} antialiased font-sans bg-black text-white`}>
        <DynamicTitle />
        <ShowreelProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ShowreelProvider>
        <Analytics />
      </body>
    </html>
  );
}
