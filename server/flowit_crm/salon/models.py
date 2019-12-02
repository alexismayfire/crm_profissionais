from django.conf import settings
from django.db.models import (
    CASCADE,
    PROTECT,
    BooleanField,
    CharField,
    DecimalField,
    DurationField,
    ForeignKey,
    ImageField,
    Model,
    TextField,
    ManyToManyField,
)
from django.utils.translation import ugettext_lazy as _


def worker_media_path(instance, filename):
    return f"uploads/{instance.worker.id}/{filename}"


class Worker(Model):
    user = ForeignKey(
        settings.AUTH_USER_MODEL, verbose_name=_("User"), on_delete=CASCADE
    )
    salon = ForeignKey("Salon", verbose_name=_("Salon"), on_delete=PROTECT, null=True)
    about = TextField(verbose_name=_("About"))

    def __str__(self):
        return f"{self.user} ({self.user.email}) [{self.pk}]"


class WorkerRole(Model):
    ROLE_CHOICES = (
        ("HR", "Hairstylist"),
        ("MK", "Makeup Artist"),
        ("NS", "Nail Professional"),
        ("SC", "Esthetician"),
        ("WX", "Waxer"),
    )
    name = CharField(verbose_name=_("Name"), max_length=2, choices=ROLE_CHOICES)


class WorkerPortfolio(Model):
    worker = ForeignKey(Worker, verbose_name=_("Worker"), on_delete=CASCADE)
    photo = ImageField(verbose_name=_("Photo"), upload_to=worker_media_path)
    label = TextField(verbose_name=_("Label"))


class WorkerService(Model):
    price = DecimalField(verbose_name=_("Price"), max_digits=6, decimal_places=2)
    time_spent = DurationField(verbose_name=_("Duration"))
    is_owner = BooleanField(default=False)
    job = ForeignKey("Job", verbose_name=_("Job"), on_delete=CASCADE)
    worker = ForeignKey(Worker, verbose_name=_("Worker"), on_delete=CASCADE)


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
    worker_job = ManyToManyField(
        Worker, through="WorkerService", through_fields=("job", "worker")
    )

    def __str__(self):
        return f"{self.name} ({self.category}) [{self.pk}]"


class Salon(Model):
    name = CharField(verbose_name=_("Name"), max_length=60)
