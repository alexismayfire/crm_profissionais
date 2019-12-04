from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm, ResetPasswordKeyForm, UserTokenForm
from rest_auth.registration.serializers import (
    RegisterSerializer as RestAuthRegisterSerializer,
)
from rest_framework.serializers import (
    BooleanField,
    CharField,
    EmailField,
    ModelSerializer,
    Serializer,
    SerializerMethodField,
    ValidationError,
)

from flowit_crm.core.utils import PHONE_PREFIXES
from flowit_crm.salon.serializers import WorkerSerializer


User = get_user_model()


class UserSerializer(ModelSerializer):
    worker = SerializerMethodField()

    class Meta:
        model = User
        fields = ["name", "email", "phone", "mobile_phone", "is_customer", "worker"]

    def get_worker(self, obj):
        related_serializer = WorkerSerializer(instance=obj.worker_set.first())
        return related_serializer.data


class RegisterSerializer(RestAuthRegisterSerializer):
    name = CharField(max_length=255, min_length=3)
    email = EmailField(required=allauth_settings.EMAIL_REQUIRED)
    password1 = CharField(write_only=True)
    password2 = CharField(write_only=True)
    mobile_phone = CharField(max_length=11, min_length=11)
    phone = CharField(allow_blank=True, max_length=10, min_length=10)
    is_customer = BooleanField()

    def _check_phone_prefix(self, phone_number):
        prefix = phone_number[0:2]
        if int(prefix) not in PHONE_PREFIXES:
            raise ValidationError(_("This phone prefix is invalid."))

    def validate_mobile_phone(self, mobile_phone):
        self._check_phone_prefix(mobile_phone)
        number = mobile_phone[2:]
        if int(number[0]) != 9:
            raise ValidationError(
                _(
                    "Mobile numbers should start with 9. "
                    "Please, check if you typed your correct mobile number"
                )
            )

        return mobile_phone

    def validate_phone(self, phone):
        if phone:
            self._check_phone_prefix(phone)
            number = phone[2:]
            if int(number[0] == 9):
                raise ValidationError(
                    _(
                        "Landlines phone numbers can't start with 9. "
                        "Please, check if you typed your correct landline number"
                    )
                )

        return phone

    def get_cleaned_data(self):
        return {
            "name": self.validated_data.get("name", ""),
            "password1": self.validated_data.get("password1", ""),
            "email": self.validated_data.get("email", ""),
            "mobile_phone": self.validated_data.get("mobile_phone", ""),
            "phone": self.validated_data.get("phone", ""),
        }


class PasswordResetSerializer(Serializer):
    def __init__(self, instance=None, **kwargs):
        super().__init__(instance, **kwargs)
        self.reset_form = None

    email = EmailField()
    password_reset_form_class = ResetPasswordForm

    def validate_email(self, value):
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise ValidationError(self.reset_form.errors)

        return value

    def save(self):
        request = self.context.get("request")
        opts = {
            "use_https": request.is_secure(),
            "from_email": getattr(settings, "DEFAULT_FROM_EMAIL"),
            "request": request,
        }
        self.reset_form.save(**opts)


class PasswordResetConfirmSerializer(Serializer):
    password1 = CharField(max_length=128)
    password2 = CharField(max_length=128)
    uid = CharField()
    key = CharField()

    token_form_class = UserTokenForm
    set_password_form_class = ResetPasswordKeyForm

    def __init__(self, instance=None, **kwargs):
        super().__init__(instance, **kwargs)
        self.reset_form = None

    def validate(self, data):
        p1 = data.get("password1", None)
        p2 = data.get("password2", None)
        uid = data.get("uid", None)
        key = data.get("key", None)
        if (p1 and p2) and p1 != p2:
            raise ValidationError({"non_field_errors": ["As senhas não conferem"]})

        token_form = self.token_form_class(data={"uidb36": uid, "key": key})
        if token_form.is_valid():
            user = token_form.reset_user
            print(user)
            kwargs = {"user": user, "data": {"password1": p1, "password2": p2}}
            self.reset_form = self.set_password_form_class(**kwargs)
            if self.reset_form.is_valid():
                return data
            else:
                print(self.reset_form.errors.as_data())
                raise ValidationError(self.reset_form.errors.as_data())
        else:
            raise ValidationError({"non_field_errors": ["Erro interno"]})

    def save(self):
        self.reset_form.save()
