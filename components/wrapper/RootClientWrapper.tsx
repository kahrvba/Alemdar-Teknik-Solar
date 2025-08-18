'use client';

import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/lib/context/auth-context';
import { Navbar } from '@/components/shared/navbar';
import { MobileBottomNav } from '@/components/shared/mobile-bottom-nav';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface RootClientWrapperProps {
    children: React.ReactNode;
}

export function RootClientWrapper({ children }: RootClientWrapperProps) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/' || pathname === '/login';

    return (
        <AuthProvider>
            {isLoginPage ? (
                // Login page layout - no navbar, no protection
                children
            ) : (
                // Dashboard layout - with navbar and protection
                <ProtectedRoute>
                    <div className="relative flex flex-col h-screen">
                        <Navbar />
                        <main className="flex flex-col flex-grow pt-4 sm:pt-6 md:pt-10 px-2 sm:px-4 md:px-6 overflow-x-hidden pb-16 md:pb-0">
                            {children}
                        </main>
                        {/* <footer className="hidden md:flex w-full items-center justify-center py-2 sm:py-3 text-xs sm:text-sm text-gray-500">
                            <p>© 2025 Solar Assistant</p>
                        </footer> */}
                        <MobileBottomNav />
                    </div>
                </ProtectedRoute>
            )}
        </AuthProvider>
    );
}
