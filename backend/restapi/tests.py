# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import pytest
from django.urls import reverse
from parameterized import parameterized
from rest_framework import status
from rest_framework.test import APITestCase


@pytest.mark.django_db(transaction=True)
class ImageCategoryTest(APITestCase):
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
