"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config/site";
import { LayoutDashboard, BarChart2, Calculator, Zap, Settings, User, LogOut } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="w-full bg-gradient-to-r from-[#255eff]-300 via-[#9e4ffe] to-[#0f172a] text-black">
      <div className="w-full pl-20 pt-6 ">
        <div className="flex flex-col gap-15">
          <div className="flex items-center justify-between pr-20">
            <NextLink href="/" className="flex items-center gap-3">
              <div className="bg-slate-900 text-white px-4 py-2 rounded-sm font-bold tracking-tight text-sm">ALEMDAR</div>
              <span className="ml-1 text-xl font-semibold">TEKNIK</span>
            </NextLink>

            {/* Profile Dropdown */}
            {user && (
              <div className="flex items-center gap-3">
                <span className="text-white font-medium">{user.name}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-3 py-2 rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-slate-700 text-white text-sm">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <NextLink href="/profile" className="flex items-center gap-2 cursor-pointer">
                        <User className="w-4 h-4" />
                        Profile
                      </NextLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
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
