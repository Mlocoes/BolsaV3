from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="BolsaV3 API",
    description="API for BolsaV3 Investment Portfolio Management",
    version="1.0.0",
)

# CORS Configuration
origins = [
    "http://localhost:3000",  # Frontend
    "http://localhost:8080",  # Nginx
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api.v1.api import api_router
from app.core.config import settings

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    """
    Endpoint raíz para verificar el estado de la API.
    """
    return {"message": "Welcome to BolsaV3 API"}
