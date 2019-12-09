from django.urls import include, path, re_path

from rest_framework import routers
from rest_auth.views import (
    LoginView,
    LogoutView,
    UserDetailsView,
    PasswordChangeView,
    PasswordResetView,
    PasswordResetConfirmView,
)
from rest_auth.registration.views import VerifyEmailView

from .api import UserAPI, two_factor


router = routers.SimpleRouter()
router.register(r"users", UserAPI)

app_name = "users"

rest_auth_overrides = [
    # URLs that do not require a session or valid token
    path("password/reset/", PasswordResetView.as_view(), name="rest_password_reset"),
    path(
        "password/reset/confirm/",
        PasswordResetConfirmView.as_view(),
        name="rest_password_reset_confirm",
    ),
    path("login/", LoginView.as_view(), name="rest_login"),
    # URLs that require a user to be logged in with a valid session / token.
    path("logout/", LogoutView.as_view(), name="rest_logout"),
    path("me/", UserDetailsView.as_view(), name="rest_user_details"),
    path("password/change/", PasswordChangeView.as_view(), name="rest_password_change"),
]

urlpatterns = (
    [
        path("register/", include("rest_auth.registration.urls")),
        path("two-factor/", view=two_factor, name="two-factor"),
    ]
    + rest_auth_overrides
    + router.urls
)
