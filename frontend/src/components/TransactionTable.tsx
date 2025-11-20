import React, { useRef, useEffect, useState } from 'react';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';
import api from '../../services/api';

registerAllModules();

interface Transaction {
    id?: number;
    type: string;
    quantity: number;
    price_per_unit: number;
    date: string;
    asset_symbol: string;
}

interface TransactionTableProps {
    portfolioId: string;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ portfolioId }) => {
    const hotRef = useRef<any>(null);
    const [data, setData] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get(`/transactions/?portfolio_id=${portfolioId}`);
                // Transform data for table if necessary
                setData(response.data);
            } catch (error) {
                console.error('Error fetching transactions', error);
            }
        };

        fetchTransactions();
    }, [portfolioId]);

    const handleAfterChange = (changes: any, source: string) => {
        if (source === 'loadData') {
            return; // Don't save if data is just loaded
        }

        // Here you would implement logic to save changes to the backend
        // For simplicity, we'll just log the changes for now
        console.log('Changes:', changes);
    };

    return (
        <div className="w-full overflow-hidden rounded-lg border border-border shadow-sm">
            <HotTable
                ref={hotRef}
                data={data}
                colHeaders={['Tipo', 'Activo', 'Cantidad', 'Precio', 'Fecha']}
                columns={[
                    { data: 'type', type: 'dropdown', source: ['COMPRA', 'VENTA', 'DIVIDENDO'] },
                    { data: 'asset_symbol', type: 'text' },
                    { data: 'quantity', type: 'numeric' },
                    { data: 'price_per_unit', type: 'numeric', numericFormat: { pattern: '$0,0.00' } },
                    { data: 'date', type: 'date', dateFormat: 'YYYY-MM-DD' },
                ]}
                rowHeaders={true}
                width="100%"
                height="auto"
                stretchH="all"
                licenseKey="non-commercial-and-evaluation" // Important for open source
                afterChange={handleAfterChange}
                className="htCustomTheme"
            />
        </div>
    );
};

export default TransactionTable;
