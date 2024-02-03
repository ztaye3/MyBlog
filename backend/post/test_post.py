from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status


# Post API integration test cases
class PostAPITestCase(TestCase):
    # Post constants
    POST_BACKEND_ENDPOINT = 'http://127.0.0.1:8000/api/blog/'
    ADD_POST_URL = 'post/v1/addPost/'
    POST_URL = 'post/v1/'
    LIST_POST_URL = 'post/v1/'

    # Instantiation
    def setUp(self) -> None:
        # Setup contains data necessary for running the test cases
        self.client = APIClient()
        self.post_data = {
            "content": "Post_test",
            "excerpt": "This is an integration test for post",
            "title": "Integration test",
            "is_displayed": True,
            "updated_by": "Auto_test",
            "created_by": "Auto_test"
        }

    # Create post test
    def test_create_post(self):

        self.create_response = self.client.post(self.POST_BACKEND_ENDPOINT + self.ADD_POST_URL, self.post_data, format='json')

        # Assert for successful response
        self.assertEqual(self.create_response.status_code, status.HTTP_201_CREATED)

    # Get  post test
    def test_list_post(self):
        self.list_response = self.client.get(self.POST_BACKEND_ENDPOINT + self.LIST_POST_URL)

        # Assert for successful response
        self.assertEqual(self.list_response.status_code, status.HTTP_200_OK)

    # Retrieve post test
    def test_retrieve_post(self):
        self.retrieve_response = self.client.get(self.POST_BACKEND_ENDPOINT + self.POST_URL + '1/')

        # Assert for content exits or not
        self.assertTrue(self.retrieve_response.status_code == status.HTTP_200_OK or
                        self.retrieve_response.status_code == status.HTTP_204_NO_CONTENT)

    # Update post test
    def test_update_post(self):
        self.update_response = self.client.put(self.POST_BACKEND_ENDPOINT + self.POST_URL + '1/', self.post_data, format='json')

        # Assert for content exits or not
        self.assertTrue(self.update_response.status_code == status.HTTP_202_ACCEPTED or
                        self.update_response.status_code == status.HTTP_204_NO_CONTENT)

    # Update post test
    def test_delete_post(self):
        self.delete_response = self.client.delete(self.POST_BACKEND_ENDPOINT + self.POST_URL + '1/')

        # Assert for content exits or not
        self.assertTrue(self.delete_response.status_code == status.HTTP_202_ACCEPTED or
                        self.delete_response.status_code == status.HTTP_204_NO_CONTENT)
