from typing import Optional
from pydantic import BaseModel

class AssetBase(BaseModel):
    symbol: str
    name: Optional[str] = None
    type: Optional[str] = None
    current_price: Optional[float] = None

class AssetCreate(AssetBase):
    pass

class AssetUpdate(AssetBase):
    pass

class AssetInDBBase(AssetBase):
    id: int

    class Config:
        from_attributes = True

class Asset(AssetInDBBase):
    pass
