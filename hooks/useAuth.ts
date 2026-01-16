import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
    const { user, logout } = useContext(AuthContext);

    return {
        user,
        isAdmin: user?.role === 'super_admin' || user?.role === 'admin',
        isLoading: false,
        signOut: async () => logout()
    };
};
