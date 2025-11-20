from sqlalchemy import Column, Integer, String, Float
from app.db.base import Base

class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, unique=True, index=True, nullable=False)
    name = Column(String)
    type = Column(String) # Stock, Crypto, ETF, etc.
    current_price = Column(Float)
