import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Plus } from 'lucide-react';

interface Portfolio {
    id: number;
    name: string;
    description: string;
}

const Dashboard: React.FC = () => {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const response = await api.get('/portfolios/');
                setPortfolios(response.data);
            } catch (error) {
                console.error('Error fetching portfolios', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolios();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-foreground">Mis Carteras</h1>
                <button
                    onClick={() => navigate('/portfolios/new')}
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Nueva Cartera
                </button>
            </div>

            {loading ? (
                <div className="text-center text-muted-foreground">Cargando...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolios.map((portfolio) => (
                        <div
                            key={portfolio.id}
                            onClick={() => navigate(`/portfolios/${portfolio.id}`)}
                            className="bg-card p-6 rounded-lg shadow-md border border-border cursor-pointer hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-xl font-semibold text-foreground mb-2">{portfolio.name}</h3>
                            <p className="text-muted-foreground mb-4">{portfolio.description}</p>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Valor Total</span>
                                <span className="font-medium text-foreground">$0.00</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
