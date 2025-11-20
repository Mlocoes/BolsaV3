import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import TransactionTable from '../components/TransactionTable';
import PortfolioChart from '../components/PortfolioChart';

interface PortfolioSummary {
    portfolio_id: number;
    total_invested: number;
    current_value: number;
    profit_loss: number;
    profit_loss_percentage: number;
}

const PortfolioDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [summary, setSummary] = useState<PortfolioSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await api.get(`/analysis/portfolio/${id}/summary`);
                setSummary(response.data);
            } catch (error) {
                console.error('Error fetching portfolio summary', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [id]);

    if (loading) return <div className="p-6 text-center">Cargando...</div>;
    if (!summary) return <div className="p-6 text-center">Cartera no encontrada</div>;

    return (
        <div className="container mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Resumen de Cartera</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-lg shadow border border-border">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Valor Actual</h3>
                    <div className="text-2xl font-bold text-foreground flex items-center">
                        <DollarSign className="w-6 h-6 mr-1" />
                        {summary.current_value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                </div>

                <div className="bg-card p-6 rounded-lg shadow border border-border">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Invertido</h3>
                    <div className="text-2xl font-bold text-foreground flex items-center">
                        <DollarSign className="w-6 h-6 mr-1" />
                        {summary.total_invested.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                </div>

                <div className="bg-card p-6 rounded-lg shadow border border-border">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Ganancia/Pérdida Total</h3>
                    <div className={`text-2xl font-bold flex items-center ${summary.profit_loss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {summary.profit_loss >= 0 ? <ArrowUpRight className="w-6 h-6 mr-1" /> : <ArrowDownRight className="w-6 h-6 mr-1" />}
                        ${Math.abs(summary.profit_loss).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        <span className="text-sm ml-2">({summary.profit_loss_percentage.toFixed(2)}%)</span>
                    </div>
                </div>
            </div>

            {/* Charts and Transactions */}
            <div className="grid grid-cols-1 gap-6">
                <div className="bg-card p-6 rounded-lg shadow border border-border h-96">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Rendimiento</h3>
                    <PortfolioChart />
                </div>
                <div className="bg-card p-6 rounded-lg shadow border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Transacciones</h3>
                    <TransactionTable portfolioId={id!} />
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetail;
