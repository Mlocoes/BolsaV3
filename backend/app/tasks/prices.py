from app.core.celery_app import celery_app
from app.db.session import SessionLocal
from app.models.asset import Asset
from app.services.alpha_vantage import get_price

@celery_app.task
def update_asset_prices():
    db = SessionLocal()
    try:
        assets = db.query(Asset).all()
        for asset in assets:
            price = get_price(asset.symbol)
            if price:
                asset.current_price = price
        db.commit()
    finally:
        db.close()
