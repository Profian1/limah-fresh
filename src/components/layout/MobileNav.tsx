"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, Package, Truck, Phone, Image as ImageIcon } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/products", label: "Products", icon: Package },
  { href: "/services", label: "Bulk", icon: Truck },
  { href: "/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/contact", label: "Contact", icon: Phone },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-[65] border-t border-mist bg-white/90 backdrop-blur-xl shadow-lg shadow-navy/10 md:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 pb-[env(safe-area-inset-bottom,0.5rem)]">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-2.5 px-3 transition ${
                active ? "text-brand" : "text-slate-500 hover:text-navy"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-brand" : ""}`} />
              <span className="text-[10px] font-bold uppercase tracking-[0.08em]">{item.label}</span>
              {active && <span className="absolute bottom-0 h-0.5 w-8 rounded-full bg-gradient-to-r from-brand to-aqua" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
