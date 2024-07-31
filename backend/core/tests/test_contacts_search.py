from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from core.models import Contacts
from datetime import datetime, timedelta


class ContactsSearchTest(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.login(username='testuser', password='testpassword')

        # Create sample Contacts
        Contacts.objects.create(user=self.user, contact='John Doe', Number='1234567890', Campaign='Campaign1',
                                Call_Date_Start=datetime.now() - timedelta(days=2),
                                Call_Date_End=datetime.now() - timedelta(days=1),
                                Duration=90, Outcome='Interested')
        Contacts.objects.create(user=self.user, contact='Jane Doe', Number='0987654321', Campaign='Campaign2',
                                Call_Date_Start=datetime.now() - timedelta(days=3),
                                Call_Date_End=datetime.now() - timedelta(days=2),
                                Duration=120, Outcome='Not interested')

    def test_search_by_contact_name(self):
        url = reverse('contacts-search') + '?contact=John'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['contact'], 'John Doe')

    def test_filter_by_campaign(self):
        url = reverse('contacts-search') + '?campaign=Campaign2'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['Campaign'], 'Campaign2')

    def test_filter_by_date_range(self):
        start_date = (datetime.now() - timedelta(days=3)).strftime('%Y-%m-%d')
        end_date = (datetime.now() - timedelta(days=2)).strftime('%Y-%m-%d')
        url = reverse('contacts-search') + f'?call_date_start={start_date}&call_date_end={end_date}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data['results']), 1)  # Assuming there might be more data in real scenarios

    def test_filter_by_outcome(self):
        url = reverse('contacts-search') + '?outcome=Interested'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['Outcome'], 'Interested')

    def test_filter_by_duration(self):
        url = reverse('contacts-search') + '?duration=1-5+minutes'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)  # Both contacts fall into this duration category