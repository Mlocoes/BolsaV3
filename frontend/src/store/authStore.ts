import { create } from 'zustand';
import api from '../services/api';

interface User {
    id: number;
    email: string;
    full_name: string;
    is_active: boolean;
    is_superuser: boolean;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
    fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    login: (token: string) => {
        localStorage.setItem('token', token);
        set({ token, isAuthenticated: true });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
    },
    fetchUser: async () => {
        set({ isLoading: true });
        try {
            const response = await api.get('/users/me');
            set({ user: response.data });
        } catch (error) {
            console.error('Failed to fetch user', error);
            set({ user: null, token: null, isAuthenticated: false });
            localStorage.removeItem('token');
        } finally {
            set({ isLoading: false });
        }
    },
}));
