import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import { Lock, Mail } from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);

            const response = await api.post('/login/access-token', formData, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            login(response.data.access_token);
            navigate('/dashboard');
        } catch (err: any) {
            setError('Correo o contraseña inválidos');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg border border-border">
                <h2 className="text-3xl font-bold text-center text-foreground">Iniciar Sesión en BolsaV3</h2>
                {error && <div className="p-3 text-sm text-red-500 bg-red-100 rounded">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Correo Electrónico</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 p-2 border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                                placeholder="tu@ejemplo.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 p-2 border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <div className="text-center text-sm text-muted-foreground">
                    ¿No tienes una cuenta? <a href="/register" className="text-primary hover:underline">Regístrate</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
