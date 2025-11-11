
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import type { Portfolio, Operation } from '../types';
import HandsontableWrapper from '../components/HandsontableWrapper';

const Portfolios: React.FC = () => {
  const { token } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [loading, setLoading] = useState({ portfolios: true, operations: false });

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!token) return;
      setLoading(prev => ({ ...prev, portfolios: true }));
      try {
        const data = await api.fetchPortfolios(token);
        setPortfolios(data);
        if (data.length > 0) {
          setSelectedPortfolio(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch portfolios:", error);
      } finally {
        setLoading(prev => ({ ...prev, portfolios: false }));
      }
    };
    fetchPortfolios();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  
  useEffect(() => {
    const fetchOperationsData = async () => {
      if (!token || !selectedPortfolio) {
        setOperations([]);
        return;
      }
      setLoading(prev => ({ ...prev, operations: true }));
      try {
        const data = await api.fetchOperations(token, selectedPortfolio.id);
        setOperations(data);
      } catch (error) {
        console.error("Failed to fetch operations:", error);
      } finally {
        setLoading(prev => ({ ...prev, operations: false }));
      }
    };
    fetchOperationsData();
  }, [token, selectedPortfolio]);

  const operationColumns = [
    { data: 'date', title: 'Date', type: 'date', dateFormat: 'YYYY-MM-DD' },
    { data: 'asset_ticker', title: 'Ticker' },
    { data: 'side', title: 'Side', type: 'dropdown', source: ['buy', 'sell'] },
    { data: 'quantity', title: 'Quantity', type: 'numeric', numericFormat: { pattern: '0,0.0000' } },
    { data: 'price', title: 'Price', type: 'numeric', numericFormat: { pattern: '$0,0.00' } },
    { data: 'fee', title: 'Fee', type: 'numeric', numericFormat: { pattern: '$0,0.00' } },
    { data: 'currency', title: 'Currency' },
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Portfolios & Operations</h1>
      <div className="flex flex-wrap gap-2">
        {portfolios.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPortfolio(p)}
            className={`px-4 py-2 rounded-lg transition-colors ${selectedPortfolio?.id === p.id ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            {p.name}
          </button>
        ))}
        <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors">+ New Portfolio</button>
      </div>

      <div>
        <h2 className="text-xl font-semibold my-4 text-white">
          Operations for: {selectedPortfolio ? selectedPortfolio.name : 'N/A'}
        </h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          {loading.operations ? <p>Loading operations...</p> : (
            <HandsontableWrapper
              data={operations}
              colHeaders={operationColumns.map(c => c.title)}
              columns={operationColumns}
              readOnly={false}
              minSpareRows={1}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolios;
