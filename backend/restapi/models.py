# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _

from restapi import utils


class ImageCategory(models.Model):
    name = models.CharField(max_length=64, unique=True, help_text=_('Name of the Image Category'))
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'image_category'
        verbose_name = _('Image Category')
        verbose_name_plural = _('Image Categories')
        ordering = ['-created']

    def __str__(self):
        return self.name


class ImageGallery(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(
        'restapi.ImageCategory',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,  # Image is set to null when corresponding category is deleted.
        related_name='%(class)s',
        help_text=_('Image Category is not a mandatory field.'),
    )
    created = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(_('Image'), upload_to=utils.default_image_path)

    class Meta:
        db_table = 'image_gallery'
        verbose_name = _('Image Gallery')
        verbose_name_plural = _('Image Galleries')
        ordering = ['-category', '-created']

    def __str__(self):
        return self.image.name
