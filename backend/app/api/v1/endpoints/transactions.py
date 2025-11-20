from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps
from app.db.session import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.Transaction])
def read_transactions(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
    portfolio_id: int = None,
) -> Any:
    """
    Obtiene las transacciones del usuario actual.
    """
    query = db.query(models.Transaction).join(models.Portfolio).filter(models.Portfolio.user_id == current_user.id)
    if portfolio_id:
        query = query.filter(models.Transaction.portfolio_id == portfolio_id)
    transactions = query.offset(skip).limit(limit).all()
    return transactions

@router.post("/", response_model=schemas.Transaction)
def create_transaction(
    *,
    db: Session = Depends(get_db),
    transaction_in: schemas.TransactionCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Crea una nueva transacción.
    """
    portfolio = db.query(models.Portfolio).filter(models.Portfolio.id == transaction_in.portfolio_id, models.Portfolio.user_id == current_user.id).first()
    if not portfolio:
        raise HTTPException(status_code=404, detail="Cartera no encontrada")
    
    transaction = models.Transaction(**transaction_in.dict())
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction
