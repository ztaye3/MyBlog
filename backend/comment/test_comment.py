from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status


# Comment API integration test cases
class CommentAPITestCase(TestCase):
    # Comment constants
    COMMENT_BACKEND_ENDPOINT = 'http://127.0.0.1:8000/api/comment/'
    ADD_COMMENT_URL = 'v1/addComment/'
    COMMENT_URL = 'v1/'
    LIST_COMMENT_URL = '/v1/'

    # Instantiation
    def setUp(self) -> None:
        # Setup contains data necessary for running the test cases
        self.client = APIClient()
        self.comment_data = {
            "content": "Comment_test",
            "is_displayed": True,
            "updated_by": "Auto_test",
            "created_by": "Auto_test"
        }

    # Create comment test
    def test_create_comment(self):

        self.create_response = self.client.post(self.COMMENT_BACKEND_ENDPOINT + self.ADD_COMMENT_URL, self.comment_data, format='json')

        # Assert for successful response
        self.assertEqual(self.create_response.status_code, status.HTTP_201_CREATED)

    # Get  comment test
    def test_list_comment(self):
        self.list_response = self.client.get(self.COMMENT_BACKEND_ENDPOINT + self.LIST_COMMENT_URL)

        # Assert for successful response
        self.assertEqual(self.list_response.status_code, status.HTTP_200_OK)

    # Retrieve comment test
    def test_retrieve_comment(self):
        self.retrieve_response = self.client.get(self.COMMENT_BACKEND_ENDPOINT + self.COMMENT_URL + '1/')

        # Assert for content exits or not
        self.assertTrue(self.retrieve_response.status_code == status.HTTP_200_OK or
                        self.retrieve_response.status_code == status.HTTP_204_NO_CONTENT)

    # Update comment test
    def test_update_comment(self):
        self.update_response = self.client.put(self.COMMENT_BACKEND_ENDPOINT + self.COMMENT_URL + '1/', self.comment_data, format='json')

        # Assert for content exits or not
        self.assertTrue(self.update_response.status_code == status.HTTP_202_ACCEPTED or
                        self.update_response.status_code == status.HTTP_204_NO_CONTENT)

    # Update comment test
    def test_delete_comment(self):
        self.delete_response = self.client.delete(self.COMMENT_BACKEND_ENDPOINT + self.COMMENT_URL + '1/')

        # Assert for content exits or not
        self.assertTrue(self.delete_response.status_code == status.HTTP_202_ACCEPTED or
                        self.delete_response.status_code == status.HTTP_204_NO_CONTENT)
