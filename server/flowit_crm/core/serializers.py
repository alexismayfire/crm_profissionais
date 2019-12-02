from rest_framework.serializers import ModelSerializer
from .models import Audit

class AuditSerializer(ModelSerializer):
    class Meta:
        model  = Audit
        fields = ['object_id', 'content_type', 'action', 'fields']