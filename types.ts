
export interface User {
  id: string;
  username: string;
  email: string;
  is_admin: boolean;
  active: boolean;
}

export type AssetType = 'stock' | 'etf' | 'fund' | 'crypto' | 'other';

export interface Asset {
  id: string;
  ticker: string;
  name: string;
  market: string;
  asset_type: AssetType;
}

export interface Portfolio {
  id: string;
  name: string;
  description: string;
}

export type OperationSide = 'buy' | 'sell';

export interface Operation {
  id: string;
  date: string;
  asset_id: string;
  asset_ticker?: string; // For display purposes
  side: OperationSide;
  quantity: number;
  price: number;
  fee: number;
  currency: string;
}

export interface Position {
    assetName: string;
    ticker: string;
    quantity: number;
    avgPurchasePrice: number;
    lastPrice: number;
    purchaseAmount: number;
    currentAmount: number;
    pnlDayAbs: number;
    pnlDayPercent: number;
    pnlTotalAbs: number;
    pnlTotalPercent: number;
}

export interface MonthlyResult {
    month: string;
    pnl_absolute: number;
    total_current_amount: number;
}
