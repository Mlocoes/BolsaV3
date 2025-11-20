from typing import Optional
from pydantic import BaseModel

class PortfolioBase(BaseModel):
    name: str
    description: Optional[str] = None

class PortfolioCreate(PortfolioBase):
    pass

class PortfolioUpdate(PortfolioBase):
    pass

class PortfolioInDBBase(PortfolioBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class Portfolio(PortfolioInDBBase):
    pass
