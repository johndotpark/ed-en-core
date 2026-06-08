import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/ui/Nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Factory OS — Clothing Brand Production Tools",
  description:
    "Generate manufacturer communication prompts, complete production checklists, and download tech-pack templates for clothing brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-black`}
      >
        <Nav />
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
        <footer className="border-t border-gray-200 py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <span className="font-medium tracking-tight text-black">Factory OS</span>
            <span>Production tools for clothing brand owners.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
