from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer
from .models import BlogPost, Category
from comment.serializers import CommentSerializer
from identity.serializers import UserAdminSerializer
from rest_framework import serializers

# Get user model
User = get_user_model()


# Category serializer
class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


# Post serializer
class PostSerializer(ModelSerializer):
    created_by = UserAdminSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'image', 'excerpt', 'content', 'created_by', 'category', 'status', 'slug',
                  'created_date', 'updated_by')


# Post serializer
class PostCreateSerializer(ModelSerializer):
    created_by = UserAdminSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'image', 'excerpt', 'content', 'created_by', 'category', 'status')


# Post Detail serializer
class PostDetailSerializer(ModelSerializer):
    total_comments = serializers.IntegerField()
    comments_list = CommentSerializer(many=True, read_only=True)
    created_by = UserAdminSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'image', 'excerpt', 'content', 'created_by', 'created_date', 'category', 'status',
                  'total_comments', 'comments_list', 'slug', 'updated_by'
                  )
