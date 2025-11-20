from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, portfolios, assets, transactions, analysis

api_router = APIRouter()
api_router.include_router(auth.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(portfolios.router, prefix="/portfolios", tags=["portfolios"])
api_router.include_router(assets.router, prefix="/assets", tags=["assets"])
api_router.include_router(transactions.router, prefix="/transactions", tags=["transactions"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["analysis"])
