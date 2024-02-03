from django.db import models

from post.models import BlogPost


class Comment(models.Model):
    """Model For The Comments In The Blog Posts"""

    content = models.TextField()
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE,
                             related_name='comments', related_query_name='comment', blank=True, null=True)
    is_displayed = models.BooleanField(default=True)
    updated_by = models.CharField(max_length=200, default='System', null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)
    created_by = models.CharField(default='Unknown', null=True, max_length=280)
    created_date = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f'Post - "{self.post.title}", Body - "{self.content}"'
