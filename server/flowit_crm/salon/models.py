from django.db.models import (
    CASCADE,
    CharField,
    DecimalField,
    DurationField,
    ForeignKey,
    ImageField,
    Model,
    TextField,
)
from django.utils.translation import ugettext_lazy as _


def worker_media_path(instance, filename):
    return f"uploads/{instance.worker.id}/{filename}"


class Worker(Model):
    about = TextField(verbose_name=_("About"))


class WorkerRole(Model):
    name = CharField(verbose_name=_("Name"), max_length=20)


class WorkerPortfolio(Model):
    worker = ForeignKey(Worker, verbose_name=_("Worker"), on_delete=CASCADE)
    photo = ImageField(verbose_name=_("Photo"), upload_to=worker_media_path)
    label = TextField(verbose_name=_("Label"))


class WorkerService(Model):
    price = DecimalField(verbose_name=_("Price"), max_digits=6, decimal_places=2)
    time_spent = DurationField(verbose_name=_("Duration"))


class Job(Model):
    CATEGORY_CHOICES = (
        ("HR", "Hair"),
        ("MK", "Make up"),
        ("NS", "Nails"),
        ("SC", "Skin Care"),
        ("WX", "Waxing"),
    )

    name = CharField(verbose_name=_("Name"), max_length=60)
    category = CharField(
        verbose_name=_("Category"), max_length=2, choices=CATEGORY_CHOICES
    )


class Salon(Model):
    name = CharField(verbose_name=_("Name"), max_length=60)
