# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from restapi import models as restapi_models


class ImageCategorySerializer(serializers.ModelSerializer):
    """
    Model Serializer for Image Category
    """

    class Meta:
        model = restapi_models.ImageCategory
        exclude = ['created']
        read_only_fields = ("id",)


class ImageGallerySerializer(serializers.ModelSerializer):
    """
    Model Serializer for Image Gallery
    """

    image_category = ImageCategorySerializer(source='category', read_only=True)

    class Meta:
        model = restapi_models.ImageGallery
        fields = "__all__"
        read_only_fields = ("id", "created")
