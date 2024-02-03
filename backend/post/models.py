from django.db import models
import os
import sys
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.template.defaultfilters import slugify
from identity.models import UserAccount
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver


# Image upload
def upload_to(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"posts/{instance.pk}/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"


class Category(models.Model):
    """Model for the Blog Category"""
    name = models.CharField(max_length=100, unique=True)


class BlogPost(models.Model):
    """Model For The Blog Post"""

    class BlogPostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=500)
    slug = models.SlugField()
    image = models.ImageField(upload_to=upload_to, blank=True, null=True, default="null")
    excerpt = models.CharField(max_length=500)
    content = models.TextField()
    # updated_by will track number of likes
    updated_by = models.BigIntegerField(default=0)
    updated_date = models.DateTimeField(auto_now=True, null=True)
    created_by = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, related_name='blog_posts')
    created_date = models.DateTimeField(auto_now_add=True, null=True)
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, default=1)
    status = models.CharField(
        max_length=10, choices=options, default='published')
    objects = models.Manager()  # default manager
    postobjects = BlogPostObjects()  # custom manager

    def __str__(self):
        return self.title

    @property
    def comments_list(self):
        return self.comments.filter(is_displayed=True)

    @property
    def total_comments(self):
        return self.comments_list.count()

    def save(self, *args, **kwargs):
        original_slug = slugify(self.title)
        queryset = BlogPost.objects.all().filter(slug__iexact=original_slug).count()

        count = 1
        slug = original_slug
        while queryset:
            slug = original_slug + '-' + str(count)
            count += 1
            queryset = BlogPost.objects.all().filter(slug__iexact=slug).count()

        self.slug = slug

        super(BlogPost, self).save(*args, **kwargs)

    class Meta:
        ordering = ['-created_date']
        indexes = [models.Index(fields=['slug'])]

    def __str__(self):
        return self.title
