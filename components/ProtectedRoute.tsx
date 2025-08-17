'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/lib/context/auth-context';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="animate-spin h-8 w-8 mx-auto text-primary" />
                    <p className="mt-4 text-default-500">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // AuthProvider will handle redirect to login
    }

    return <>{children}</>;
}