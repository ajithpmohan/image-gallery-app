# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.urls import path

from restapi import views

urlpatterns = [
    path(
        "image-category/",
        views.ImageCategoryAPIView.as_view(),
        name="driver_register",
    ),
    path(
        "image-gallery/",
        views.ImageGalleryAPIView.as_view(),
        name="driver_location",
    ),
]
