from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps
from app.db.session import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.Asset])
def read_assets(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Obtiene la lista de activos.
    """
    assets = db.query(models.Asset).offset(skip).limit(limit).all()
    return assets

@router.post("/", response_model=schemas.Asset)
def create_asset(
    *,
    db: Session = Depends(get_db),
    asset_in: schemas.AssetCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Crea un nuevo activo. Solo los superusuarios pueden crear activos.
    """
    asset = db.query(models.Asset).filter(models.Asset.symbol == asset_in.symbol).first()
    if asset:
        raise HTTPException(
            status_code=400,
            detail="Ya existe un activo con este símbolo en el sistema.",
        )
    asset = models.Asset(**asset_in.dict())
    db.add(asset)
    db.commit()
    db.refresh(asset)
    return asset
