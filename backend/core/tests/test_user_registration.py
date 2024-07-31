from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

class UserRegistrationTest(APITestCase):
    def test_user_registration(self):
        """
        Ensure we can create a new user.
        """
        url = reverse('register')
        data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'password'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('access' in response.data)
        self.assertTrue('refresh' in response.data)
        user = User.objects.get(username='testuser')
        self.assertTrue(user is not None)

    def test_user_registration_with_invalid_data(self):
        """
        Ensure user registration with invalid data fails.
        """
        url = reverse('register')
        data = {
            'username': '',
            'email': 'testuser3@example.com',
            'password': 'password'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_registration_with_invalid_email(self):
        """
        Ensure user registration with invalid email address fails.
        """
        url = reverse('register')
        data = {
            'username': 'testuser4',
            'email': 'invalid_email',
            'password': 'password'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertContains(response, 'Enter a valid email address.', status_code=status.HTTP_400_BAD_REQUEST)