from django.utils.translation import ugettext_lazy as _

from allauth.account import app_settings as allauth_settings
from rest_auth.registration.serializers import RegisterSerializer as RestAuthRegisterSerializer
from rest_framework.serializers import CharField, EmailField, ValidationError

from flowit_crm.core.utils import PHONE_PREFIXES


class RegisterSerializer(RestAuthRegisterSerializer):
    name = CharField(max_length=255, min_length=3)
    email = EmailField(required=allauth_settings.EMAIL_REQUIRED)
    password1 = CharField(write_only=True)
    password2 = CharField(write_only=True)
    mobile_phone = CharField(max_length=11, min_length=11)
    phone = CharField(allow_blank=True, max_length=10, min_length=10)

    def _check_phone_prefix(self, phone_number):
        prefix = phone_number[0:2]
        if int(prefix) not in PHONE_PREFIXES:
            raise ValidationError(_("This phone prefix is invalid."))

    def validate_mobile_phone(self, mobile_phone):
        self._check_phone_prefix(mobile_phone)
        number = mobile_phone[2:]
        if int(number[0]) != 9:
            raise ValidationError(
                _("Mobile numbers should start with 9. "
                  "Please, check if you typed your correct mobile number")
            )

        return mobile_phone

    def validate_phone(self, phone):
        if phone:
            self._check_phone_prefix(phone)
            number = phone[2:]
            if int(number[0] == 9):
                raise ValidationError(
                    _("Landlines phone numbers can't start with 9. "
                      "Please, check if you typed your correct landline number")
                )

        return phone

    def get_cleaned_data(self):
        return {
            'name': self.validated_data.get('name', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'mobile_phone': self.validated_data.get('mobile_phone', ''),
            'phone': self.validated_data.get('phone', '')
        }
