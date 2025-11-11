
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import type { Portfolio, Position, MonthlyResult } from '../types';
import HandsontableWrapper from '../components/HandsontableWrapper';
import ChartMonthly from '../components/ChartMonthly';

const Dashboard: React.FC = () => {
  const { token } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [monthlyResults, setMonthlyResults] = useState<MonthlyResult[]>([]);
  const [loading, setLoading] = useState({ portfolios: true, positions: false, chart: true });

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      
      setLoading(prev => ({ ...prev, portfolios: true, chart: true }));
      try {
        const [portfolioData, chartData] = await Promise.all([
            api.fetchPortfolios(token),
            api.fetchMonthlyResults(token)
        ]);

        setPortfolios(portfolioData);
        setMonthlyResults(chartData);
        if (portfolioData.length > 0) {
            setSelectedPortfolio(portfolioData[0]);
        }
      } catch (error) {
        console.error("Failed to fetch initial dashboard data:", error);
      } finally {
        setLoading(prev => ({ ...prev, portfolios: false, chart: false }));
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const fetchPositionsData = async () => {
      if (!token || !selectedPortfolio) {
        setPositions([]);
        return;
      };
      
      setLoading(prev => ({ ...prev, positions: true }));
      try {
        const positionsData = await api.fetchPositions(token, selectedPortfolio.id);
        setPositions(positionsData);
      } catch (error) {
        console.error(`Failed to fetch positions for portfolio ${selectedPortfolio.id}:`, error);
      } finally {
        setLoading(prev => ({ ...prev, positions: false }));
      }
    };
    fetchPositionsData();
  }, [token, selectedPortfolio]);
  
  const positionColumns = [
    { data: 'ticker', title: 'Ticker', readOnly: true },
    { data: 'assetName', title: 'Asset Name', readOnly: true },
    { data: 'quantity', title: 'Quantity', type: 'numeric', numericFormat: { pattern: '0,0.00' }, readOnly: true },
    { data: 'avgPurchasePrice', title: 'Avg. Price', type: 'numeric', numericFormat: { pattern: '$0,0.00' }, readOnly: true },
    { data: 'lastPrice', title: 'Last Price', type: 'numeric', numericFormat: { pattern: '$0,0.00' }, readOnly: true },
    { data: 'currentAmount', title: 'Current Value', type: 'numeric', numericFormat: { pattern: '$0,0.00' }, readOnly: true },
    { data: 'pnlTotalAbs', title: 'Total P&L ($)', type: 'numeric', numericFormat: { pattern: '$0,0.00' }, readOnly: true },
    { data: 'pnlTotalPercent', title: 'Total P&L (%)', type: 'numeric', numericFormat: { pattern: '0.00%' }, readOnly: true },
  ];

  const positionsDataForTable = positions.map(p => ({
      ...p,
      pnlTotalPercent: p.pnlTotalPercent / 100 // Handsontable % format expects a decimal
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">My Portfolios</h2>
          {loading.portfolios ? <p>Loading...</p> : (
            <ul className="space-y-2">
              {portfolios.map(p => (
                <li key={p.id}>
                  <button
                    onClick={() => setSelectedPortfolio(p)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${selectedPortfolio?.id === p.id ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-gray-300">{p.description}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          {loading.chart ? <p>Loading Chart...</p> : <ChartMonthly data={monthlyResults} />}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Positions for: {selectedPortfolio ? selectedPortfolio.name : 'No portfolio selected'}
        </h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          {loading.positions ? <p>Loading positions...</p> : (
             <HandsontableWrapper
                data={positionsDataForTable}
                colHeaders={positionColumns.map(c => c.title)}
                columns={positionColumns}
                readOnly={true}
             />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
