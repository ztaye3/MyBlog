from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer

# Get user model
User = get_user_model()


# User serializer
class UserAdminSerializer(ModelSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
        'id', 'email', 'first_name', 'last_name', 'is_admin', 'is_staff', 'is_active', 'is_activated', 'profile_picture'
        )


# Update profile serializer
class UpdateUserProfileSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'profile_picture')
