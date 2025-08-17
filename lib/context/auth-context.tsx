'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Handle hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Check for existing auth token on mount
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                // Clear invalid user data
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, [mounted]);

    useEffect(() => {
        if (!mounted || isLoading) return;

        // Redirect logic
        const isAuthPage = pathname === '/' || pathname === '/login';
        const isAuthenticated = !!user;
        const isDashboardPath = pathname.startsWith('/dashboard') || pathname.startsWith('/(dashboard)');

        if (!isAuthenticated && isDashboardPath) {
            router.push('/');
        } else if (isAuthenticated && isAuthPage) {
            router.push('/dashboard');
        }
    }, [user, isLoading, pathname, router, mounted]);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            // Replace with your actual authentication logic
            if (email === 'admin@solar.com' && password === 'admin123') {
                const userData = { email, name: 'Solar Admin' };
                if (typeof window !== 'undefined') {
                    localStorage.setItem('auth_token', 'authenticated');
                    localStorage.setItem('user', JSON.stringify(userData));
                }
                setUser(userData);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
        }
        setUser(null);
        router.push('/');
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user,
    };

    if (!mounted) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}