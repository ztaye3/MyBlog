from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
import random
import string


# Identity API integration test cases
class PostAPITestCase(TestCase):
    # Identity constants
    IDENTITY_BACKEND_ENDPOINT = 'http://127.0.0.1:8000/api/auth/'
    ADD_IDENTITY_URL = 'v1/addUser/'
    IDENTITY_URL = 'v1/user/'
    LIST_IDENTITY_URL = 'v1/user/'

    # random email generator
    def random_char(self, char_num):
        return ''.join(random.choice(string.ascii_letters) for _ in range(char_num))

    # Instantiation
    def setUp(self) -> None:
        # Setup contains data necessary for running the test cases
        self.client = APIClient()
        self.user_data = {
            "email": (self.random_char(7)+"@gmail.com"),
            "first_name": "Admin",
            "last_name": "Tester",
            "updated_by": "Auto_test",
            "created_by": "Auto_test"
        }

    # Create identity test
    def test_create_identity(self):
        self.create_response = self.client.post(self.IDENTITY_BACKEND_ENDPOINT + self.ADD_IDENTITY_URL,
                                                self.user_data,
                                                format='json')

        # Assert for successful response
        self.assertEqual(self.create_response.status_code, status.HTTP_201_CREATED)

    # Get  identity test
    def test_list_identity(self):
        self.list_response = self.client.get(self.IDENTITY_BACKEND_ENDPOINT + self.LIST_IDENTITY_URL)

        # Assert for successful response
        self.assertEqual(self.list_response.status_code, status.HTTP_200_OK)

    # Retrieve identity test
    def test_retrieve_identity(self):
        self.retrieve_response = self.client.get(self.IDENTITY_BACKEND_ENDPOINT + self.IDENTITY_URL + '1')

        # Assert for content exits or not
        self.assertTrue(self.retrieve_response.status_code == status.HTTP_200_OK or
                        self.retrieve_response.status_code == status.HTTP_204_NO_CONTENT)

    # Update identity test
    def test_update_identity(self):
        self.update_response = self.client.put(self.IDENTITY_BACKEND_ENDPOINT + self.IDENTITY_URL + '1',
                                               self.user_data,
                                               format='json')

        # Assert for content exits or not
        self.assertTrue(self.update_response.status_code == status.HTTP_202_ACCEPTED or
                        self.update_response.status_code == status.HTTP_204_NO_CONTENT)

    # Update identity test
    def test_delete_identity(self):
        self.delete_response = self.client.delete(self.IDENTITY_BACKEND_ENDPOINT + self.IDENTITY_URL + '1')

        # Assert for content exits or not
        self.assertTrue(self.delete_response.status_code == status.HTTP_202_ACCEPTED or
                        self.delete_response.status_code == status.HTTP_204_NO_CONTENT)
