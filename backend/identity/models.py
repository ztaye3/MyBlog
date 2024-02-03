from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser, PermissionsMixin, BaseUserManager
import os
import sys
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


# Image upload
def upload_to(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"users/{instance.pk}/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"


# Customized user account manager
class UserAccountManager(BaseUserManager):
    def create_user(self, email,  password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,  email, password=None, **extra_fields):
        user = self.create_user(email, password=password, **extra_fields)
        user.is_active = True
        user.is_staff = True
        user.is_admin = True
        user.profile_picture = ''

        user.save(using=self._db)
        return user


# Customized user model
class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=True)
    is_activated = models.BooleanField(default=False)
    profile_picture = models.ImageField(upload_to=upload_to, blank=True, null=True, default="null")
    updated_by = models.CharField(max_length=200, default='System', null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)
    created_by = models.CharField(default='System', null=True, max_length=280)
    created_date = models.DateTimeField(auto_now_add=True, null=True)

    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "is_admin",
                       "is_staff", "is_activated", "profile_picture", "updated_by", "created_by",
                       ]

    def get_full_name(self):
        return f"{self.first_name} - {self.last_name}"

    def get_short_name(self):
        return self.first_name

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def __str__(self):
        return self.email


User._meta.get_field('email')._unique = True
User._meta.get_field('email').blank = False
User._meta.get_field('email').null = False


# Merchant model
class MerchantModel(models.Model):
    merchant = models.ManyToManyField(UserAccount, related_name='user_merchant', default='', blank=True)
    identification = models.CharField(max_length=1000, default='', blank=True)

    def __str__(self):
        return self.identification
