from sqlalchemy import Column, ForeignKey, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from app.db.base import Base
import datetime

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=False)
    asset_id = Column(Integer, ForeignKey("assets.id"), nullable=False)
    type = Column(String, nullable=False) # BUY, SELL, DIVIDEND
    quantity = Column(Float, nullable=False)
    price_per_unit = Column(Float, nullable=False)
    date = Column(DateTime, default=datetime.datetime.utcnow)
    
    portfolio = relationship("Portfolio", backref="transactions")
    asset = relationship("Asset")
