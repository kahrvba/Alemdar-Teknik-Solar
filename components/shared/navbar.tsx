"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/config/site";
import { LayoutDashboard, BarChart2, Calculator, Zap, Settings, User, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/context/auth-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-gradient-to-r from-[#255eff]-300 via-[#9e4ffe] to-[#0f172a] text-black">
      <div className="w-full px-4 sm:px-6 lg:pl-20 pt-6">
        <div className="flex flex-col gap-4 lg:gap-15">
          {/* Top Row - Logo and Profile */}
          <div className="flex items-center justify-between lg:pr-20">
            <NextLink href="/" className="flex items-center gap-3">
              <div className="bg-slate-900 text-white px-3 sm:px-4 py-2 rounded-sm font-bold tracking-tight text-xs sm:text-sm">ALEMDAR</div>
              <span className="ml-1 text-lg sm:text-xl font-semibold text-white">TEKNIK</span>
            </NextLink>

            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              {isMobile && (
                <button
                  onClick={toggleMenu}
                  className="lg:hidden bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-lg"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6 text-white" />
                  ) : (
                    <Menu className="w-6 h-6 text-white" />
                  )}
                </button>
              )}

              {/* Profile Dropdown */}
              {user && (
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="hidden sm:block text-white font-medium text-sm">{user.name}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-2 sm:px-3 py-2 rounded-lg">
                        <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
                          <AvatarFallback className="bg-slate-700 text-white text-xs sm:text-sm">
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
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-end">
            <ul className="flex gap-2 flex-nowrap items-center">
              {siteConfig.navItems.map((item, idx) => (
                <li key={item.href}>
                  <NextLink
                    href={item.href}
                    className={
                      pathname === item.href
                        ? "bg-white text-black px-6 py-5 text-sm font-medium whitespace-nowrap flex items-center gap-2"
                        : "bg-white/30 text-black/80 px-6 py-5 text-sm font-medium hover:bg-white/40 whitespace-nowrap flex items-center gap-2"
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

          {/* Mobile Navigation Menu */}
          {isMobile && isMenuOpen && (
            <nav className="lg:hidden bg-white/10 backdrop-blur-sm rounded-lg mx-4 mb-4">
              <ul className="py-4">
                {siteConfig.navItems.map((item, idx) => (
                  <li key={item.href}>
                    <NextLink
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={
                        pathname === item.href
                          ? "bg-white/20 text-white px-4 py-3 text-sm font-medium flex items-center gap-3 border-l-4 border-white"
                          : "text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 text-sm font-medium flex items-center gap-3"
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
          )}
        </div>
      </div>
    </header>
  );
};
