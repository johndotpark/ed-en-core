"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/prompt-builder", label: "Prompt Builder" },
  { href: "/templates", label: "Tech Pack Templates" },
  { href: "/checklist", label: "Production Checklist" },
  { href: "/resources", label: "Resources" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight shrink-0"
          style={{ color: "var(--foreground)" }}
        >
          ED:EN Production
        </Link>
        <div className="hidden md:flex items-center gap-1 overflow-x-auto">
          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 text-sm whitespace-nowrap transition-colors ${
                pathname === link.href
                  ? "text-[#F4F2EE] bg-[#111111]"
                  : "hover:bg-[#EDEAE4]"
              }`}
              style={pathname !== link.href ? { color: "var(--muted)" } : {}}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Mobile nav */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto">
          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 py-1 text-xs whitespace-nowrap transition-colors ${
                pathname === link.href
                  ? "text-[#F4F2EE] bg-[#111111]"
                  : ""
              }`}
              style={pathname !== link.href ? { color: "var(--muted)" } : {}}
            >
              {link.label.split(" ")[0]}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
