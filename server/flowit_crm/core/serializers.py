from django.contrib.contenttypes.models import ContentType

from rest_framework.serializers import ModelSerializer, SerializerMethodField

from flowit_crm.users.serializers import UserSerializer
from .models import Audit


class AuditSerializer(ModelSerializer):
    obj = SerializerMethodField()
    model_type = SerializerMethodField()

    class Meta:
        model = Audit
        fields = ["obj", "model_type", "action", "fields", "created_at"]

    def get_obj(self, obj):
        obj_class = obj.content_type.model_class()
        data = obj_class.objects.get(pk=obj.object_id)
        return UserSerializer(instance=data).data

    def get_model_type(self, obj):
        return f"{obj.content_type.app_label}.{obj.content_type.model}"
