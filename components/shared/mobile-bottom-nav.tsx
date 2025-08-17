'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BarChart2, Calculator, Zap, Settings } from 'lucide-react';
import { siteConfig } from '@/lib/config/site';

export const MobileBottomNav = () => {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 shadow-lg z-10">
            <div className="flex items-center justify-between px-2 py-2">
                {siteConfig.navItems.map((item, idx) => {
                    // Only show first 5 navigation items
                    if (idx >= 5) return null;

                    const isActive = pathname === item.href;

                    // Icons based on index
                    let icon;
                    switch (idx) {
                        case 0: icon = <LayoutDashboard className="w-5 h-5" />; break;
                        case 1: icon = <BarChart2 className="w-5 h-5" />; break;
                        case 2: icon = <Calculator className="w-5 h-5" />; break;
                        case 3: icon = <Zap className="w-5 h-5" />; break;
                        case 4: icon = <Settings className="w-5 h-5" />; break;
                        default: icon = null;
                    }

                    return (
                        <NextLink
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg ${isActive
                                    ? 'text-orange-500'
                                    : 'text-gray-600 hover:text-orange-500'
                                }`}
                        >
                            {icon}
                            <span className="text-[10px] mt-1">{item.label}</span>
                        </NextLink>
                    );
                })}
            </div>
        </div>
    );
};
