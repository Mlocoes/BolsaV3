import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Lock, Mail, User } from 'lucide-react';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/users/', {
                email,
                password,
                full_name: fullName,
            });
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Error al registrar usuario');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg border border-border">
                <h2 className="text-3xl font-bold text-center text-foreground">Crear Cuenta</h2>
                {error && <div className="p-3 text-sm text-red-500 bg-red-100 rounded">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Nombre Completo</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full pl-10 p-2 border rounded-md bg-input text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                                placeholder="Juan Pérez"
                            />
                        </div>
                    </div>
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
                        Registrarse
                    </button>
                </form>
                <div className="text-center text-sm text-muted-foreground">
                    ¿Ya tienes una cuenta? <a href="/login" className="text-primary hover:underline">Inicia Sesión</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
