from typing import Any

from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.conf import settings
from django.http import HttpRequest

from flowit_crm.salon.models import Worker


class AccountAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request):
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)

    def save_user(self, request, user, form):
        user = super().save_user(request, user, form, commit=False)
        data = form.cleaned_data
        user.username = data["email"]
        user.name = data["name"]
        user.is_customer = data["is_customer"]
        user.mobile_phone = data["mobile_phone"]
        if "phone" in data:
            user.phone = data["phone"]
        user.save()
        if not user.is_customer:
            Worker.objects.create(user=user)

        return user

class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def is_open_for_signup(self, request, sociallogin):
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)
