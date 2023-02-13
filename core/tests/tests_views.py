from django.test import (TestCase, Client)
from django.contrib.auth.models import (User, Group)
from django.urls import (reverse_lazy, reverse)
from django.contrib.messages import get_messages
from books.models import Book
from django.conf import settings
import os
# Import for create image in python for test image fields
from django.core.files.uploadedfile import SimpleUploadedFile

class DashboardViewTestcase(TestCase):
    @classmethod
    def setUpTestData(cls):
        Group.objects.create(name='admin')
        user = User(username='test', email='ychag@example.com')
        user.set_password('test')
        user.save()
        # Create a new admin user and save
        user = User(username='test_admin', email='ychag@example.com')
        user.set_password('test')
        user.save()
        # After creating a test_admin user, add a admin group to him groups permissions
        user.groups.add(Group.objects.get(name='admin'))
        user.save()
        
        for i in range(10):
            Book.objects.create(title=f'test_book_{i}', author=f'test_author_{i}',
                                description=f'test_description_{i}', quantity=100)

    @staticmethod
    def get_image_file():
        image = open(os.path.join(settings.BASE_DIR,
                     "core/tests/test_image.jfif"), "rb")
        return SimpleUploadedFile("test_image.jfif", image.read(), content_type="image/jfif")


    def test_dashboard_book_create_view(self):
        """_summary_
        This test is to check if the dashboard book create view .
        """
        self.client.login(username="test_admin", password="test")
        response = self.client.get(reverse_lazy(
            'core:dashboard_book_create_form'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'core/dashboard/book_form.html')        
        self.assertTrue(response.context['form'])
        
    def test_dashboard_book_list_view(self):
        """_summary_
        This test is to check if the dashboard book list view is work as well.
        """
        self.client.login(username="test_admin", password="test")
        response = self.client.get(reverse_lazy(
            'core:dashboard_books_list'))
        self.assertEqual(response.status_code, 200)
        self.assertIn("books_list",response.context)
        self.assertTemplateUsed(response, 'core/dashboard/books_list.html')
        
    def test_dashboard_student_list_view(self):
        """_summary_
        This test is to check if the dashboard student list view is work as well.
        """
        self.client.login(username="test_admin", password="test")
        response = self.client.get(reverse_lazy('core:dashboard_students_list'))
        self.assertEqual(response.status_code, 200)
        self.assertIn("students_list",response.context)
        self.assertTemplateUsed(response, 'core/dashboard/students_list.html')
        
    def test_dashboard_view(self):
        """_summary_
        This test is to check if the dashboard view is work as well.
        """
        self.client.login(username="test_admin", password="test")
        response = self.client.get(reverse_lazy('core:dashboard'))
        self.assertEqual(response.status_code, 200)
        self.assertIn("total_students",response.context)
        self.assertIn("total_books",response.context)
        self.assertIn("total_issue_books",response.context)
        self.assertTemplateUsed(response, 'core/dashboard/index.html')
    def test_dashboard_book_delete_url(self):
        """_summary_
        This test is to check if the dashboard book delete url allows the user to access the page if he has group permissions to enter this page.
        Group permissions are called (admin).
        """
        self.client.login(username="test_admin", password="test")
        response = self.client.get(reverse_lazy(
            'core:dashboard_book_delete', args=[2]))
        messages = [msg.message for msg in get_messages(
            response.wsgi_request) if msg.level == 25]  # 25 is SUCCESS
        self.assertIn('Book has been successfully deleted', messages)
        self.assertEqual(response.status_code, 302)

    def test_dashboard_book_delete_urls_not_exists_book(self):
        """_summary_
        This test is to check if the dashboard book delete url to not exists book.
        """
        self.client.login(username="test_admin", password="test")
        response = self.client.get(reverse_lazy(
            'core:dashboard_book_delete', args=[20]))
        self.assertEqual(response.status_code, 404)

    def test_dashboard_student_delete_view(self):
        """_summary_
        This test is to check if the dashboard student delete url.
        """
        self.client.login(username="test_admin", password="test")
        response = self.client.get(reverse_lazy(
            'core:dashboard_student_delete', args=[2]))
        messages = [msg.message for msg in get_messages(
            response.wsgi_request) if msg.level == 25]  # 25 is SUCCESS
        self.assertIn('Student has been successfully deleted', messages)
        self.assertEqual(response.status_code, 302)

    def test_dashboard_student_book_view_not_exists_student(self):
        """_summary_
        This test is to check if the dashboard student delete url to not exists student.
        """
        self.client.login(username="test_admin", password="test")
        response = self.client.get(reverse_lazy(
            'core:dashboard_student_delete', args=[20]))
        self.assertEqual(response.status_code, 404)
        
class ProfileViewTestcase(TestCase):
    @classmethod
    def setUpTestData(cls):
        Group.objects.create(name='admin')
        user = User(username='test', email='ychag@example.com')
        user.set_password('test')
        user.save()
        # Create a new admin user and save
        user = User(username='test_admin', email='ychag@example.com')
        user.set_password('test')
        user.save()
        # After creating a test_admin user, add a admin group to him groups permissions
        user.groups.add(Group.objects.get(name='admin'))
        user.save()

    @staticmethod
    def get_image_file():
        image = open(os.path.join(settings.BASE_DIR,
                     "core/tests/test_image.jfif"), "rb")
        return SimpleUploadedFile("test_image.jfif", image.read(), content_type="image/jfif")

    def test_profile_view(self):
        """_summary_
        This test is to check if the profile view is work as well.
        """
        self.client.login(username="test", password="test")
        response = self.client.get(reverse_lazy('core:profile'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'core/profile/index.html')

    def test_profile_update_view(self):
        """_summary_
        This test is to check if the profile update view is work as well.
        """
        self.client.login(username="test", password="test")
        data = {"first_name": "test", "last_name": "test",
                "username": "test2", "email": "test@example.com"}
        response = self.client.post(reverse_lazy('core:profile_update'), data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.wsgi_request.user.first_name,
                         data['first_name'])
        self.assertEqual(response.wsgi_request.user.last_name,
                         data['last_name'])
        self.assertEqual(response.wsgi_request.user.username, data['username'])
        self.assertJSONEqual(response.content, {'status': 'success', "data": {
            "email": response.wsgi_request.user.email,
            "username": response.wsgi_request.user.username,
            "first_name": response.wsgi_request.user.first_name,
            "last_name": response.wsgi_request.user.last_name,
        }})

    def test_profile_update_view_not_exists_user(self):
        """_summary_
        This test is to check if the profile update view to not exists user return raise and message.
        """
        data = {"first_name": "test", "last_name": "test",
                "username": "test2", "email": "test@example.com"}
        response = self.client.post(reverse_lazy('core:profile_update'), data)
        self.assertEqual(response.status_code, 401)
        self.assertJSONEqual(response.content, {'status': 'error', "error": [
                             "You must be logged in to update your profile"]})

    def test_profile_update_picture_view(self):
        """_summary_
        This test is to check if the profile update picture view is work as well.
        """
        self.client.login(username="test", password="test")
        data = {"picture": self.get_image_file()}
        response = self.client.post(reverse_lazy(
            'core:profile_picture_update'), data)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(
            response.wsgi_request.user.profile.picture)
        self.assertEqual(
            response.wsgi_request.user.profile.picture.name,  f'images/profile/test_image.jfif')
        self.assertJSONEqual(response.content, {
                             'status': 'success', "message": "Profile picture updated"})
