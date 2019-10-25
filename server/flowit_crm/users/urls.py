from django.urls import include, path

from flowit_crm.users.views import (
    csrf_token_view,
    user_redirect_view,
    user_update_view,
    user_detail_view,
)

app_name = "users"
urlpatterns = [
    # path(r"^accounts/", include("allauth.urls")),
    path("csrf/", view=csrf_token_view, name="csrf"),
    path("register/", include("rest_auth.registration.urls")),
    path("", include("rest_auth.urls")),
    # path("~redirect/", view=user_redirect_view, name="redirect"),
    # path("~update/", view=user_update_view, name="update"),
    # path("<str:username>/", view=user_detail_view, name="detail"),
]
