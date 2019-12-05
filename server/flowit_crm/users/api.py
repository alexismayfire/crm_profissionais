from django.contrib.auth import get_user_model

from rest_framework.viewsets import ModelViewSet

from .serializers import UserSerializer


User = get_user_model()


class UserAPI(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
