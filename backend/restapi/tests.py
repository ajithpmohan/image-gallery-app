# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import io

import pytest
from django.urls import reverse
from parameterized import parameterized
from PIL import Image
from rest_framework import status
from rest_framework.test import APITestCase


@pytest.mark.django_db(transaction=True)
class ImageCategoryAPITest(APITestCase):
    @parameterized.expand(
        [
            (
                {
                    "name": "Machine Learning",
                },
                {
                    "name": "Machine Learning",
                },
            ),
        ]
    )
    def test_can_raise_unique_error(self, *args):
        """
        TestCase to verify that category value is unique.
        """
        response = self.client.get(reverse('restapi:image_category'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

        response = self.client.post(reverse('restapi:image_category'), data=args[0])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.post(reverse('restapi:image_category'), data=args[1])
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['name'][0].code, 'unique')

        response = self.client.get(reverse('restapi:image_category'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    @parameterized.expand(
        [
            (
                {
                    "name": "Machine Learning",
                },
                {
                    "name": "Artificial Intelligence",
                },
                {
                    "name": "Deep Learning",
                },
            ),
        ]
    )
    def test_can_create_category(self, *args):
        """
        TestCase to create category.
        """
        response = self.client.get(reverse('restapi:image_category'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

        for arg in args:
            response = self.client.post(reverse('restapi:image_category'), data=arg)
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.get(reverse('restapi:image_category'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)


@pytest.mark.django_db(transaction=True)
class ImageGalleryAPITest(APITestCase):
    def generate_photo_file(self):
        file = io.BytesIO()
        image = Image.new('RGBA', size=(100, 100), color=(155, 0, 0))
        image.save(file, 'png')
        file.name = 'test.png'
        file.seek(0)
        return file

    @parameterized.expand(
        [
            (
                # catagory create data only. image upload data will create dynamically
                {
                    "name": "Machine Learning",
                },
            ),
        ]
    )
    def test_can_upload_image(self, *args):
        """
        TestCase to upload image
        """

        # Image Category API Testing
        response = self.client.get(reverse('restapi:image_category'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

        response = self.client.post(reverse('restapi:image_category'), data=args[0])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Category id is needed for image uploading
        category = response.data.get('id')

        # Image Gallery API Testing
        response = self.client.get(reverse('restapi:image_gallery'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

        # Image Gallery API Upload Image Testing
        data = {'category': category, 'image': self.generate_photo_file()}
        response = self.client.post(
            reverse('restapi:image_gallery'), data=data, format='multipart'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Image Gallery API Testing
        response = self.client.get(reverse('restapi:image_gallery'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
