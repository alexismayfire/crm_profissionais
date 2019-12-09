import json
import random

from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.viewsets import ModelViewSet

from .serializers import UserSerializer


User = get_user_model()


class UserAPI(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@csrf_exempt
def two_factor(request):
    if request.method == "GET":
        return JsonResponse(status=405, data={"detail": "Não aceita GET"})

    data = json.loads(request.body)
    email = data.get("email", None)
    #code = 95123
    code = random.randint(100, 1000)
    send_mail(
        "Seu código de verificação",
        f"Por favor, digite o código {code} para validar o seu login.",
        "webmaster@localhost",
        [email],
        fail_silently=False,
    )

    return JsonResponse(status=201, data={"code": code})

