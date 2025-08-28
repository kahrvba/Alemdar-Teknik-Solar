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
                    <div className="relative flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex flex-col flex-1 pt-4 sm:pt-6 lg:pt-10 px-3 sm:px-4 lg:px-6 xl:px-8 overflow-x-hidden pb-20 lg:pb-6">
                            {children}
                        </main>
                        {/* <footer className="hidden lg:flex w-full items-center justify-center py-2 sm:py-3 text-xs sm:text-sm text-gray-500">
                            <p>© 2025 Solar Assistant</p>
                        </footer> */}
                        <MobileBottomNav />
                    </div>
                </ProtectedRoute>
            )}
        </AuthProvider>
    );
}
