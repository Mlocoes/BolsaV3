from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps
from app.db.session import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.Portfolio])
def read_portfolios(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Obtiene las carteras del usuario actual.
    """
    portfolios = db.query(models.Portfolio).filter(models.Portfolio.user_id == current_user.id).offset(skip).limit(limit).all()
    return portfolios

@router.post("/", response_model=schemas.Portfolio)
def create_portfolio(
    *,
    db: Session = Depends(get_db),
    portfolio_in: schemas.PortfolioCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Crea una nueva cartera.
    """
    portfolio = models.Portfolio(**portfolio_in.dict(), user_id=current_user.id)
    db.add(portfolio)
    db.commit()
    db.refresh(portfolio)
    return portfolio

@router.get("/{id}", response_model=schemas.Portfolio)
def read_portfolio(
    *,
    db: Session = Depends(get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Obtiene una cartera por ID.
    """
    portfolio = db.query(models.Portfolio).filter(models.Portfolio.id == id, models.Portfolio.user_id == current_user.id).first()
    if not portfolio:
        raise HTTPException(status_code=404, detail="Cartera no encontrada")
    return portfolio

@router.delete("/{id}", response_model=schemas.Portfolio)
def delete_portfolio(
    *,
    db: Session = Depends(get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Elimina una cartera.
    """
    portfolio = db.query(models.Portfolio).filter(models.Portfolio.id == id, models.Portfolio.user_id == current_user.id).first()
    if not portfolio:
        raise HTTPException(status_code=404, detail="Cartera no encontrada")
    db.delete(portfolio)
    db.commit()
    return portfolio
