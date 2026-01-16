import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminUser {
    id: string;
    email: string;
    role: 'super_admin' | 'admin';
}

interface AuthContextType {
    user: AdminUser | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
    addAdmin: (email: string, password: string) => void;
    admins: AdminUser[];
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial Super Admin Creds
const SUPER_ADMIN_EMAIL = "lenexus.co@gmail.com";
const SUPER_ADMIN_PASS = "@interfac2026";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AdminUser | null>(() => {
        const saved = localStorage.getItem('dc_auth_user');
        return saved ? JSON.parse(saved) : null;
    });

    // In a real app, passwords should be hashed and Salted. 
    // For this local storage demo, we will store them in a simple object structure in validAdmins in localStorage.
    // Structure: { email: password }
    const [validAdmins, setValidAdmins] = useState<Record<string, string>>(() => {
        const saved = localStorage.getItem('dc_valid_admins');
        return saved ? JSON.parse(saved) : { [SUPER_ADMIN_EMAIL]: SUPER_ADMIN_PASS };
    });

    useEffect(() => {
        localStorage.setItem('dc_auth_user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem('dc_valid_admins', JSON.stringify(validAdmins));
    }, [validAdmins]);

    const login = (email: string, pass: string): boolean => {
        if (validAdmins[email] && validAdmins[email] === pass) {
            const role = email === SUPER_ADMIN_EMAIL ? 'super_admin' : 'admin';
            setUser({ id: email, email, role });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    const addAdmin = (email: string, pass: string) => {
        setValidAdmins(prev => ({ ...prev, [email]: pass }));
    };

    const admins = Object.keys(validAdmins).map(email => ({
        id: email,
        email,
        role: email === SUPER_ADMIN_EMAIL ? 'super_admin' : 'admin' as 'admin'
    }));

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, addAdmin, admins }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
