'use client';

import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/lib/context/auth-context';
import { Navbar } from '@/components/shared/navbar';
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
                        <main className="flex flex-col flex-grow pt-10 px-4">
                            {children}
                        </main>
                        <footer className="w-full flex items-center justify-center py-3">
                            {/* Footer content */}
                        </footer>
                    </div>
                </ProtectedRoute>
            )}
        </AuthProvider>
    );
}
