
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import type { Asset, AssetType } from '../types';
import HandsontableWrapper from '../components/HandsontableWrapper';

const Assets: React.FC = () => {
  const { token } = useAuth();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssetsData = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const data = await api.fetchAssets(token);
        setAssets(data);
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssetsData();
  }, [token]);

  const assetColumns = [
    { data: 'ticker', title: 'Ticker' },
    { data: 'name', title: 'Name' },
    { data: 'market', title: 'Market' },
    { 
      data: 'asset_type', 
      title: 'Type', 
      type: 'dropdown', 
      source: ['stock', 'etf', 'fund', 'crypto', 'other'] as AssetType[]
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Assets Catalog</h1>
        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">Save Changes</button>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        {loading ? <p>Loading assets...</p> : (
          <HandsontableWrapper
            data={assets}
            colHeaders={assetColumns.map(c => c.title)}
            columns={assetColumns}
            readOnly={false}
            minSpareRows={1}
          />
        )}
      </div>
    </div>
  );
};

export default Assets;
