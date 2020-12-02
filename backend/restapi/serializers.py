# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from restapi import models as rest_api_models


class ImageCategorySerializer(serializers.ModelSerializer):
    """
    Model Serializer for Image Category
    """

    class Meta:
        model = rest_api_models.ImageCategory
        exclude = ['created']
        read_only_fields = ("id",)

    def validate(self, attrs):
        if rest_api_models.ImageCategory.objects.filter(name__iexact=attrs['name']).exists():
            raise serializers.ValidationError(
                {"name": _("Image Category with this name already exists.")}
            )
        return attrs


class ImageGallerySerializer(serializers.ModelSerializer):
    """
    Model Serializer for Image Gallery
    """

    image_category = ImageCategorySerializer(source='category', read_only=True)

    class Meta:
        model = rest_api_models.ImageGallery
        fields = "__all__"
        read_only_fields = ("id", "created")
