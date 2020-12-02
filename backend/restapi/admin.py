# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from restapi import models as rest_api_models


@admin.register(rest_api_models.ImageCategory)
class ImageCategoryAdmin(admin.ModelAdmin):
    """
    Admin Panel for handling Image Category Model
    """

    fields = (
        'id',
        'name',
        'created',
    )

    list_display = (
        'name',
        'id',
        'created',
    )

    readonly_fields = (
        'id',
        'created',
    )


@admin.register(rest_api_models.ImageGallery)
class ImageGalleryAdmin(admin.ModelAdmin):
    """
    Admin Panel for handling Image Gallery Model
    """

    fields = (
        'id',
        'category',
        'created',
        'image',
    )

    list_display = (
        'id',
        'category',
        'created',
        'image',
    )

    readonly_fields = (
        'id',
        'created',
    )
