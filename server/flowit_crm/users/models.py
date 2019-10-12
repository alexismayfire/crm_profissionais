from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models import CharField, EmailField
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):
    def create_user(self, email, name, mobile_phone, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email), name=name, mobile_phone=mobile_phone
        )

        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, name, mobile_phone, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(email, name, mobile_phone, password=password)
        user.is_admin = True
        user.save()
        return user


class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = CharField(_("Name of User"), blank=True, max_length=255)
    email = EmailField(_("Email Address"), unique=True)
    # TODO: phone validators
    phone = CharField(_("Phone"), blank=True, max_length=20)
    mobile_phone = CharField(_("Mobile Phone"), blank=True, max_length=20)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "mobile_phone"]

    objects = UserManager()

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})
