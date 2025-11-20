from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps
from app.db.session import get_db

router = APIRouter()

@router.get("/portfolio/{portfolio_id}/summary")
def get_portfolio_summary(
    portfolio_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Obtiene el resumen de la cartera (valor total, costo total, ganancia/pérdida).
    """
    # Verificar propiedad de la cartera
    portfolio = db.query(models.Portfolio).filter(models.Portfolio.id == portfolio_id, models.Portfolio.user_id == current_user.id).first()
    if not portfolio:
        raise HTTPException(status_code=404, detail="Cartera no encontrada")

    transactions = db.query(models.Transaction).filter(models.Transaction.portfolio_id == portfolio_id).all()
    
    total_cost = 0.0
    current_value = 0.0
    
    holdings = {}
    
    for tx in transactions:
        if tx.type == "BUY":
            total_cost += tx.quantity * tx.price_per_unit
            if tx.asset_id not in holdings:
                holdings[tx.asset_id] = 0.0
            holdings[tx.asset_id] += tx.quantity
        elif tx.type == "SELL":
            # Por simplicidad, tratamos las ventas como retorno de capital.
            # Una implementación más compleja calcularía ganancias/pérdidas realizadas.
            total_cost -= tx.quantity * tx.price_per_unit
            if tx.asset_id in holdings:
                holdings[tx.asset_id] -= tx.quantity
    
    # Calcular valor actual basado en los últimos precios
    for asset_id, quantity in holdings.items():
        if quantity > 0:
            asset = db.query(models.Asset).filter(models.Asset.id == asset_id).first()
            if asset and asset.current_price:
                current_value += quantity * asset.current_price
            
    return {
        "portfolio_id": portfolio_id,
        "total_invested": total_cost,
        "current_value": current_value,
        "profit_loss": current_value - total_cost,
        "profit_loss_percentage": ((current_value - total_cost) / total_cost * 100) if total_cost != 0 else 0
    }
