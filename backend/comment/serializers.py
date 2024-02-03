from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer
from .models import Comment
from post.models import BlogPost, Category
from identity.serializers import UserAdminSerializer

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
        fields = ('id', 'title', 'image', 'excerpt', 'content', 'created_by', 'category', 'status', 'slug')


# Comment serializer
class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'content', 'is_displayed', 'created_by', 'created_date'
                  )


# Create Comment serializer
class CreateCommentSerializer(ModelSerializer):
    post = PostSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'content', 'is_displayed', 'created_by', 'created_date', 'post'
                  )
        # extra_kwargs = {'post': {'required': False, 'allow_null':True, 'default':None}}
