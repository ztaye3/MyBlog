from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status


# Personal API integration test cases
class PersonalAPITestCase(TestCase):
    # Personal constants
    PERSONAL_BACKEND_ENDPOINT = 'http://127.0.0.1:8000/api/personal/'
    ADD_CV_URL = 'v1/cv/addCv'
    CV_URL = 'v1/cv/'
    LIST_CV_URL = 'v1/cv'

    ADD_ABOUT_URL = 'v1/about/addAbout'
    ABOUT_URL = 'v1/about/'
    LIST_ABOUT_URL = 'v1/about'

    ADD_PROJECT_URL = 'v1/project/addProject'
    PROJECT_URL = 'v1/project/'
    LIST_PROJECT_URL = 'v1/project'
    # Instantiation
    def setUp(self) -> None:
        # Setup contains data necessary for running the test cases
        self.client = APIClient()
        self.cv_data = {
            "name": "CV_test",
            "is_displayed": True,
            "updated_by": "Auto_test",
            "created_by": "Auto_test"
        }
        self.about_data = {
            "content": "About_test",
            "is_displayed": True,
            "updated_by": "Auto_test",
            "created_by": "Auto_test"
        }
        self.project_data = {
            "name": "Project_test",
            "link": "https://www.zekariashirpo.com/",
            "summary": "Project_test integration test",
            "is_displayed": True,
            "updated_by": "Auto_test",
            "created_by": "Auto_test"
        }

    # Create cv test
    def test_create_cv(self):

        self.create_response = self.client.post(self.PERSONAL_BACKEND_ENDPOINT + self.ADD_CV_URL, self.cv_data, format='json')

        # Assert for successful response
        self.assertEqual(self.create_response.status_code, status.HTTP_201_CREATED)

    # Get  cv test
    def test_list_cv(self):
        self.list_response = self.client.get(self.PERSONAL_BACKEND_ENDPOINT + self.LIST_CV_URL)

        # Assert for successful response
        self.assertEqual(self.list_response.status_code, status.HTTP_200_OK)

    # Retrieve cv test
    def test_retrieve_cv(self):
        self.retrieve_response = self.client.get(self.PERSONAL_BACKEND_ENDPOINT + self.CV_URL + '1')

        # Assert for content exits or not
        self.assertTrue(self.retrieve_response.status_code == status.HTTP_200_OK or
                        self.retrieve_response.status_code == status.HTTP_204_NO_CONTENT)

    # Update cv test
    def test_update_cv(self):
        self.update_response = self.client.put(self.PERSONAL_BACKEND_ENDPOINT + self.CV_URL + '1', self.cv_data, format='json')

        # Assert for content exits or not
        self.assertTrue(self.update_response.status_code == status.HTTP_202_ACCEPTED or
                        self.update_response.status_code == status.HTTP_204_NO_CONTENT)

    # Update cv test
    def test_delete_cv(self):
        self.delete_response = self.client.delete(self.PERSONAL_BACKEND_ENDPOINT + self.CV_URL + '1')

        # Assert for content exits or not
        self.assertTrue(self.delete_response.status_code == status.HTTP_202_ACCEPTED or
                        self.delete_response.status_code == status.HTTP_204_NO_CONTENT)

    # Create project  test
    def test_create_project (self):

        self.create_response = self.client.post(self.PERSONAL_BACKEND_ENDPOINT + self.ADD_PROJECT_URL, self.project_data, format='json')

        # Assert for successful response
        self.assertEqual(self.create_response.status_code, status.HTTP_201_CREATED)

    # Get  project  test
    def test_list_project (self):
        self.list_response = self.client.get(self.PERSONAL_BACKEND_ENDPOINT + self.LIST_PROJECT_URL)

        # Assert for successful response
        self.assertEqual(self.list_response.status_code, status.HTTP_200_OK)

    # Retrieve project  test
    def test_retrieve_project (self):
        self.retrieve_response = self.client.get(self.PERSONAL_BACKEND_ENDPOINT + self.PROJECT_URL + '1')

        # Assert for content exits or not
        self.assertTrue(self.retrieve_response.status_code == status.HTTP_200_OK or
                        self.retrieve_response.status_code == status.HTTP_204_NO_CONTENT)

    # Update project  test
    def test_update_project (self):
        self.update_response = self.client.put(self.PERSONAL_BACKEND_ENDPOINT + self.PROJECT_URL + '1', self.project_data, format='json')

        # Assert for content exits or not
        self.assertTrue(self.update_response.status_code == status.HTTP_202_ACCEPTED or
                        self.update_response.status_code == status.HTTP_204_NO_CONTENT)

    # Update project  test
    def test_delete_project (self):
        self.delete_response = self.client.delete(self.PERSONAL_BACKEND_ENDPOINT + self.PROJECT_URL + '1')

        # Assert for content exits or not
        self.assertTrue(self.delete_response.status_code == status.HTTP_202_ACCEPTED or
                        self.delete_response.status_code == status.HTTP_204_NO_CONTENT)