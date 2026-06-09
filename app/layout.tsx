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
  title: "ED:EN Production — Clothing Brand Production Tools",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <Nav />
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
        <footer className="border-t mt-16" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--muted)" }}>
            <span className="font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>ED:EN Production</span>
            <span>Production tools for clothing brand owners.</span>
            <a
              href="https://buymeacoffee.com/jawndot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#FFDD00] text-black text-xs font-semibold hover:bg-[#f0cf00] transition-colors"
            >
              ☕ Buy me a coffee
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
