"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config/site";
import { LayoutDashboard, BarChart2, Calculator, Zap, Settings } from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="w-full bg-gradient-to-r from-yellow-300 via-orange-300 to-orange-400 text-black">
      <div className="w-full pl-20 pt-6 ">
        <div className="flex flex-col gap-15">
          <div className="flex items-center gap-3">
            <NextLink href="/" className="flex items-center gap-3">
              <div className="bg-slate-900 text-white px-4 py-2 rounded-sm font-bold tracking-tight text-sm">solar</div>
              <span className="ml-1 text-xl font-semibold">assistant</span>
            </NextLink>
          </div>
          <nav className="flex items-end">
            <ul className="flex gap-2 flex-nowrap items-center">
              {siteConfig.navItems.map((item, idx) => (
                <li key={item.href}>
                  <NextLink
                    href={item.href}
                    className={
                      pathname === item.href
                        ? "bg-white text-black px-6 py-5 text-sm font-medium whitespace-nowrap flex items-center gap-2"
                        : "bg-white/30 text-black/80 px-6 py-5 text-sm font-medium hover: whitespace-nowrap flex items-center gap-2"
                    }
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {idx === 0 && <LayoutDashboard className="w-5 h-5" />}
                    {idx === 1 && <BarChart2 className="w-5 h-5" />}
                    {idx === 2 && <Calculator className="w-5 h-5" />}
                    {idx === 3 && <Zap className="w-5 h-5" />}
                    {idx === 4 && <Settings className="w-5 h-5" />}
                    <span>{item.label}</span>
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
