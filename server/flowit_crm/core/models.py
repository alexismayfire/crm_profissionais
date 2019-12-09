from django.contrib.postgres.fields import ArrayField
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db.models import (
    PROTECT,
    CharField,
    DateTimeField,
    ForeignKey,
    Model,
    PositiveIntegerField,
)
from django.utils.translation import ugettext_lazy as _


class GenericRelationBase(Model):
    object_id = PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")

    class Meta:
        abstract = True


class TimestampedModel(Model):
    created_at = DateTimeField(_("Created at"), auto_now_add=True)
    updated_at = DateTimeField(_("Updated at"), auto_now=True)

    class Meta:
        abstract = True


class Audit(GenericRelationBase):
    ACTION_CHOICES = (("C", "Created"), ("U", "Updated"), ("D", "Deleted"))

    content_type = ForeignKey(ContentType, on_delete=PROTECT)
    action = CharField(verbose_name=_("Action"), max_length=1, choices=ACTION_CHOICES)
    fields = ArrayField(CharField(max_length=200))
    created_at = DateTimeField(_("Created at"), auto_now_add=True)

    class Meta:
        verbose_name = _("Action Log")
        verbose_name_plural = _("Action Logs")
