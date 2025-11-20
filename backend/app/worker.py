from app.core.celery_app import celery_app
from app.tasks.prices import update_asset_prices

@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    # Update prices every 5 minutes
    sender.add_periodic_task(300.0, update_asset_prices.s(), name='update prices every 5 mins')
