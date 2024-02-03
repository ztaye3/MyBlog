from django.db import models
import os
import sys
from django.utils import timezone

# Image upload
def upload_to(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"cv/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"

# Image upload
def upload_to_project(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"about/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"

class Cv(models.Model):
    """Model For The CV"""

    name = models.CharField(max_length=200, default='System', null=True)
    file = models.FileField(upload_to=upload_to, blank=True, null=True, default="null")
    is_displayed = models.BooleanField(default=True)
    updated_by = models.CharField(max_length=200, default='System', null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)
    created_by = models.CharField(default='Unknown', null=True, max_length=280)
    created_date = models.DateTimeField(auto_now_add=True, null=True)


class About(models.Model):
    """Model For The Content"""

    content = models.TextField()
    is_displayed = models.BooleanField(default=True)
    updated_by = models.CharField(max_length=200, default='System', null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)
    created_by = models.CharField(default='Unknown', null=True, max_length=280)
    created_date = models.DateTimeField(auto_now_add=True, null=True)


class Project(models.Model):
    """Model For The Project"""

    name = models.CharField(max_length=200, default='System', null=True)
    summary = models.CharField(max_length=200, default='System', null=True)
    link = models.CharField(max_length=200, null=True, blank=True)
    is_displayed = models.BooleanField(default=True)
    updated_by = models.CharField(max_length=200, default='System', null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)
    created_by = models.CharField(default='Unknown', null=True, max_length=280)
    created_date = models.DateTimeField(auto_now_add=True, null=True)
    image = models.ImageField(upload_to=upload_to_project, blank=True, null=True, default="null")

