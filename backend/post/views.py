from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status, viewsets, generics
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
import json
from django.core.paginator import Paginator
from rest_framework.generics import ListAPIView
from .models import BlogPost, Category
from .serializers import PostSerializer, CategorySerializer, PostDetailSerializer, PostCreateSerializer
from django.contrib.auth import get_user_model

# Get user model
User = get_user_model()


# Category view
class CategoryView(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    # Get all category API : api/blog/category/v1/, Method:GET
    def list(self, request, page=None, offset=None):

        # Check if any category exist
        try:
            queryset = Category.objects.all()
        except Category.DoesNotExist:
            return Response(data={'message': 'No category registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = CategorySerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Create category API : api/blog/category/v1/addCategory/, Method:POST
    def create(self, request):

        serializer = CategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Get category API : api/auth/category/v1/'pk', Method:GET
    def retrieve(self, request, pk=None):
        # Check if the category is exist

        try:

            queryset = Category.objects.filter(id=pk)

        except Category.DoesNotExist:
            return Response(data={'message': 'category does not exits'}, status=status.HTTP_204_NO_CONTENT)

        else:
            serializer = CategorySerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Update category API : api/blog/category/v1/'pk'/, Method:PUT
    def update(self, request, pk=None):

        # Check if the category exists
        try:
            queryset = Category.objects.get(id=pk)
        except Category.DoesNotExist:
            return Response(data={'message': 'category does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = CategorySerializer(instance=queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    # Delete category API : api/blog/category/v1/'pk', Method:DELETE
    def destroy(self, request, pk=None):
        # Check if the category exists
        try:
            queryset = Category.objects.get(id=pk)
        except Category.DoesNotExist:
            return Response(data={'message': 'Category does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            queryset.delete()
            return Response(status=status.HTTP_200_OK)


# Blog Post view
class PostView(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = BlogPost.objects.all()
    serializer_class = PostSerializer(many=True)
    lookup_field = 'slug'

    # Get all post API : api/blog/post/v1/, Method:GET
    def list(self, request, page=None, offset=None):

        # Check if any category exist
        try:
            queryset = BlogPost.objects.all()
        except BlogPost.DoesNotExist:
            return Response(data={'message': 'No post registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = PostSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Create post API : api/blog/post/v1/addPost/, Method:POST
    def create(self, request):

        # enable update
        # remember old state
        _mutable = request.data._mutable

        request.data._mutable = True

        # filter data
        data = request.data

        # filter user by email
        author = data['created_by']



        # update fields
        data['created_by'] = ''

        # filter instances
        user_instance = get_object_or_404(User, email=author)

        if 'category' in data:
            # filter category
            category = data['category']
            data['category'] = ''

            serializer = PostCreateSerializer(data=data)
            serializer.is_valid(raise_exception=True)

            category_instance = get_object_or_404(Category, name=category)

            serializer.save(category=category_instance, created_by=user_instance)

            # set mutable flag back
            request.data._mutable = _mutable

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data={'message': 'blog does not exits'}, status=status.HTTP_204_NO_CONTENT)

    # Get post API : api/blog/post/v1/'pk', Method:GET
    def retrieve(self, request, pk=None):
        # Check if the blog is exist

        try:

            queryset = BlogPost.objects.filter(
                slug=pk, status='published')

        except BlogPost.DoesNotExist:
            return Response(data={'message': 'blog does not exits'}, status=status.HTTP_204_NO_CONTENT)

        else:
            serializer = PostDetailSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Update post API : api/blog/post/v1/'pk'/, Method:PUT
    def update(self, request, pk=None):

        # Check if the category exists
        try:
            queryset = BlogPost.objects.get(id=pk)
        except BlogPost.DoesNotExist:
            return Response(data={'message': 'blog does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = PostSerializer(instance=queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    # Delete post API : api/blog/post/v1/'pk', Method:DELETE
    def destroy(self, request, pk=None):
        # Check if the post exists
        try:
            queryset = BlogPost.objects.get(id=pk)
        except BlogPost.DoesNotExist:
            return Response(data={'message': 'Blog does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            queryset.delete()
            return Response(status=status.HTTP_200_OK)


# View For The Details Of A Single Post
class PostDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = PostDetailSerializer
    lookup_field = 'slug'


# Filter post by category
class PostByCategory(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = BlogPost.objects.all()
    serializer_class = PostSerializer(many=True)

    # Get post API : api/blog/post/category/v1/'pk', Method:GET
    def retrieve(self, request, pk=None):
        """
        :param request:
        :param pk:
        :return:
        """
        category_instance = Category.objects.get(id=pk)
        post_list = BlogPost.objects.filter(
            category=category_instance, status='published')
        serializer = PostSerializer(post_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Update  post like
class UpdatePostLike(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = BlogPost.objects.all()
    serializer_class = PostSerializer(many=True)

    # Get post API : api/blog/post/category/v1/'pk', Method:GET
    def update(self, request, pk=None):
        """
        :param request:
        :param pk:
        :return:
        """

        # Check if the category exists
        try:
            queryset = BlogPost.objects.get(id=pk)
            data = request.data

        except BlogPost.DoesNotExist:
            return Response(data={'message': 'blog does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            BlogPost.objects.filter(id=pk).update(updated_by=data['like_count'])
            return Response(status=status.HTTP_202_ACCEPTED)

# Search post
class SearchPost(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = BlogPost.objects.all()
    serializer_class = PostSerializer(many=True)

    # Get post API : api/blog/post/search/v1/'key', Method:GET
    def retrieve(self, request, pk=None):
        """
        :param request:
        :param pk:
        :return:
        """
        post_list = BlogPost.objects.filter(
            excerpt__contains=pk)
        serializer = PostSerializer(post_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)