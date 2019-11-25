from django.urls import include, path


app_name = "users"
urlpatterns = [
    path("register/", include("rest_auth.registration.urls")),
    path("", include("rest_auth.urls")),
]
