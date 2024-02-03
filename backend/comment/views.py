from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets, generics

from .serializers import CommentSerializer, CreateCommentSerializer
from .models import Comment
from post.models import BlogPost


# Blog Post view
class CommentView(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CreateCommentSerializer(many=True)

    # Create post API : api/comment/v1/addComment/, Method:POST
    def create(self, request):

        # filter data
        data = request.data

        serializer = CreateCommentSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        # filter instances
        if 'slug' in data:
            post_instance = get_object_or_404(BlogPost, slug=data['slug'])

            serializer.save(post=post_instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Get all comment API : api/comment/v1/, Method:GET
    def list(self, request, page=None, offset=None):

        # Check if any comment exist
        try:
            queryset = Comment.objects.filter(
                        is_displayed=True)
        except Comment.DoesNotExist:
            return Response(data={'message': 'No comment registered'}, status=status.HTTP_204_NO_CONTENT)
        else:

            serializer = CommentSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # Get comment API : api/comment/v1/'pk', Method:GET
    def retrieve(self, request, pk=None):
        # Check if the comment is exist with slug

        post_instance = get_object_or_404(BlogPost, slug=pk)
        comment_list = Comment.objects.filter(
            post=post_instance, is_displayed=True)
        serializer = CommentSerializer(comment_list, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    # Update comment API : api/comment/v1/'pk', Method:PUT
    def update(self, request, pk=None):

        # Check if the comment exists
        try:
            queryset = Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            return Response(data={'message': 'comment does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = CommentSerializer(instance=queryset, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    # Delete comment API : api/comment/v1/'pk', Method:DELETE
    def destroy(self, request, pk=None):
        # Check if the comment exists
        try:
            queryset = Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            return Response(data={'message': 'Comment does not exits'}, status=status.HTTP_204_NO_CONTENT)
        else:
            queryset.delete()
            return Response(status=status.HTTP_200_OK)

