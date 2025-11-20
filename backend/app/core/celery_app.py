from celery import Celery
from app.core.config import settings

celery_app = Celery("worker", broker=f"redis://{settings.REDIS_SERVER}:6379/0")

celery_app.conf.task_routes = {"app.tasks.*": "main-queue"}
celery_app.conf.broker_connection_retry_on_startup = True
