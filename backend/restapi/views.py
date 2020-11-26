# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import permissions
from rest_framework.generics import ListCreateAPIView
from rest_framework.parsers import MultiPartParser

from restapi import models as restapi_models
from restapi import serializers


class ImageCategoryAPIView(ListCreateAPIView):
    """
    API Endpoint for create/list Image Category
    """

    permission_classes = [permissions.AllowAny]
    queryset = restapi_models.ImageCategory.objects.all()
    serializer_class = serializers.ImageCategorySerializer


class ImageGalleryAPIView(ListCreateAPIView):
    """
    API Endpoint for create/list Image Category
    """

    parser_classes = [MultiPartParser]
    permission_classes = [permissions.AllowAny]
    queryset = restapi_models.ImageGallery.objects.all()
    serializer_class = serializers.ImageGallerySerializer
