
import React from 'react';
import type { MonthlyResult } from '../types';

interface ChartMonthlyProps {
  data: MonthlyResult[];
}

// Faking recharts components for demonstration as they are not available in this environment.
// In a real Vite project with dependencies, you would `import { ... } from 'recharts';`
const ResponsiveContainer: React.FC<{children: React.ReactNode}> = ({children}) => <div className="w-full h-64 md:h-80">{children}</div>;
const BarChart: React.FC<{children: React.ReactNode, data: any[]}> = ({children, data}) => <div className="text-center p-4 border border-dashed border-gray-600 rounded-lg bg-gray-800">Chart Placeholder. Data points: {data.length}</div>;
const XAxis: React.FC<any> = () => null;
const YAxis: React.FC<any> = () => null;
const Tooltip: React.FC<any> = () => null;
const Legend: React.FC<any> = () => null;
const Bar: React.FC<any> = () => null;
const CartesianGrid: React.FC<any> = () => null;

const ChartMonthly: React.FC<ChartMonthlyProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-center p-8 text-gray-500">No data available for chart.</div>;
  }
  
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-white">Monthly Performance</h3>
        <ResponsiveContainer>
            <BarChart
                data={data}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="month" stroke="#a0aec0" />
                <YAxis stroke="#a0aec0" />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568' }} 
                    labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                <Bar dataKey="pnl_absolute" fill="#48bb78" name="Monthly P&L" />
                <Bar dataKey="total_current_amount" fill="#4299e1" name="Total Value" />
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default ChartMonthly;
