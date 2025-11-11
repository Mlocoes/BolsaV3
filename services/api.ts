import type { User, Portfolio, Position, MonthlyResult, Asset, Operation } from '../types';

// Mock data
const MOCK_USER: User = { id: '1', username: 'demo', email: 'demo@bolsav3.com', is_admin: true, active: true };
const MOCK_ADMIN_USER: User = { id: '2', username: 'admin', email: 'admin@bolsav3.com', is_admin: true, active: true };

const MOCK_PORTFOLIOS: Portfolio[] = [
  { id: 'p1', name: 'Tech Growth', description: 'Portfolio focused on high-growth technology stocks.' },
  { id: 'p2', name: 'Dividend Income', description: 'Portfolio for generating stable dividend income.' },
];

const MOCK_POSITIONS: { [portfolioId: string]: Position[] } = {
  p1: [
    { assetName: 'Apple Inc.', ticker: 'AAPL', quantity: 50, avgPurchasePrice: 150.00, lastPrice: 175.25, purchaseAmount: 7500.00, currentAmount: 8762.50, pnlDayAbs: 125.50, pnlDayPercent: 1.45, pnlTotalAbs: 1262.50, pnlTotalPercent: 16.83 },
    { assetName: 'Microsoft Corp.', ticker: 'MSFT', quantity: 30, avgPurchasePrice: 300.00, lastPrice: 330.50, purchaseAmount: 9000.00, currentAmount: 9915.00, pnlDayAbs: -45.00, pnlDayPercent: -0.45, pnlTotalAbs: 915.00, pnlTotalPercent: 10.17 },
    { assetName: 'NVIDIA Corp.', ticker: 'NVDA', quantity: 20, avgPurchasePrice: 450.00, lastPrice: 780.00, purchaseAmount: 9000.00, currentAmount: 15600.00, pnlDayAbs: 500.00, pnlDayPercent: 3.31, pnlTotalAbs: 6600.00, pnlTotalPercent: 73.33 },
  ],
  p2: [
    { assetName: 'Realty Income', ticker: 'O', quantity: 100, avgPurchasePrice: 60.00, lastPrice: 58.50, purchaseAmount: 6000.00, currentAmount: 5850.00, pnlDayAbs: 30.00, pnlDayPercent: 0.52, pnlTotalAbs: -150.00, pnlTotalPercent: -2.50 },
    { assetName: 'AT&T Inc.', ticker: 'T', quantity: 200, avgPurchasePrice: 18.00, lastPrice: 17.50, purchaseAmount: 3600.00, currentAmount: 3500.00, pnlDayAbs: -50.00, pnlDayPercent: -1.41, pnlTotalAbs: -100.00, pnlTotalPercent: -2.78 },
  ]
};

const MOCK_MONTHLY_RESULTS: MonthlyResult[] = [
    { month: 'Jan', pnl_absolute: 1200, total_current_amount: 26200 },
    { month: 'Feb', pnl_absolute: -500, total_current_amount: 25700 },
    { month: 'Mar', pnl_absolute: 2500, total_current_amount: 28200 },
    { month: 'Apr', pnl_absolute: 800, total_current_amount: 29000 },
    { month: 'May', pnl_absolute: 3100, total_current_amount: 32100 },
];

const MOCK_ASSETS: Asset[] = [
    { id: 'a1', ticker: 'AAPL', name: 'Apple Inc.', market: 'NASDAQ', asset_type: 'stock' },
    { id: 'a2', ticker: 'MSFT', name: 'Microsoft Corp.', market: 'NASDAQ', asset_type: 'stock' },
    { id: 'a3', ticker: 'NVDA', name: 'NVIDIA Corp.', market: 'NASDAQ', asset_type: 'stock' },
    { id: 'a4', ticker: 'O', name: 'Realty Income', market: 'NYSE', asset_type: 'stock' },
    { id: 'a5', ticker: 'T', name: 'AT&T Inc.', market: 'NYSE', asset_type: 'stock' },
    { id: 'a6', ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust', market: 'ARCA', asset_type: 'etf' },
];

const MOCK_OPERATIONS: { [portfolioId: string]: Operation[] } = {
  p1: [
    {id: 'op1', date: '2023-01-15', asset_id: 'a1', asset_ticker: 'AAPL', side: 'buy', quantity: 50, price: 150, fee: 5, currency: 'USD'},
    {id: 'op2', date: '2023-02-10', asset_id: 'a2', asset_ticker: 'MSFT', side: 'buy', quantity: 30, price: 300, fee: 5, currency: 'USD'},
    {id: 'op3', date: '2023-03-05', asset_id: 'a3', asset_ticker: 'NVDA', side: 'buy', quantity: 20, price: 450, fee: 5, currency: 'USD'},
  ],
  p2: [],
};


// API functions
const api = {
  login: async (username: string, password_hash: string): Promise<{ token: string; user: User }> => {
    console.log(`Attempting login for ${username}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((username === 'demo' || username === 'admin') && password_hash === 'password') {
          const user = username === 'admin' ? MOCK_ADMIN_USER : MOCK_USER;
          resolve({ token: 'fake-jwt-token', user });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  fetchPortfolios: async (token: string): Promise<Portfolio[]> => {
    console.log('Fetching portfolios with token:', token);
    return new Promise(resolve => setTimeout(() => resolve(MOCK_PORTFOLIOS), 500));
  },
  
  fetchPositions: async (token: string, portfolioId: string): Promise<Position[]> => {
    console.log(`Fetching positions for portfolio ${portfolioId} with token:`, token);
    return new Promise(resolve => setTimeout(() => resolve(MOCK_POSITIONS[portfolioId] || []), 500));
  },

  fetchMonthlyResults: async (token: string): Promise<MonthlyResult[]> => {
    console.log('Fetching monthly results with token:', token);
    return new Promise(resolve => setTimeout(() => resolve(MOCK_MONTHLY_RESULTS), 500));
  },

  fetchAssets: async (token: string): Promise<Asset[]> => {
    console.log('Fetching assets with token:', token);
    return new Promise(resolve => setTimeout(() => resolve(MOCK_ASSETS), 500));
  },

  fetchOperations: async (token: string, portfolioId: string): Promise<Operation[]> => {
    console.log(`Fetching operations for portfolio ${portfolioId} with token:`, token);
    return new Promise(resolve => setTimeout(() => resolve(MOCK_OPERATIONS[portfolioId] || []), 500));
  },

  fetchUsers: async (token: string): Promise<User[]> => {
    console.log('Fetching users with token:', token);
    return new Promise(resolve => setTimeout(() => resolve([MOCK_USER, MOCK_ADMIN_USER]), 500));
  }
};

export default api;