from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class TransactionBase(BaseModel):
    type: str
    quantity: float
    price_per_unit: float
    date: datetime

class TransactionCreate(TransactionBase):
    portfolio_id: int
    asset_id: int

class TransactionUpdate(TransactionBase):
    pass

class TransactionInDBBase(TransactionBase):
    id: int
    portfolio_id: int
    asset_id: int

    class Config:
        from_attributes = True

class Transaction(TransactionInDBBase):
    pass
