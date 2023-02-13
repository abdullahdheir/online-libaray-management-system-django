from django.test import (TestCase)
from django.contrib.auth.models import (User, Group)
from django.urls import (reverse_lazy, reverse)
from django.contrib.messages import get_messages
from books.models import Book

class ProfileUrlTestcase(TestCase):
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

    def test_dashboard_url_redirecting_anonymous_user(self):
        response = self.client.get(reverse_lazy('core:dashboard'))
        self.assertRedirects(
            response, f"%s?next={reverse_lazy('core:dashboard')}" % (reverse_lazy('login')))

    def test_dashboard_url_redirecting_authenticated_user_without_permission(self):
        """_summary_
        This test is to check if the dashboard urls is redirecting to the login page if user is not has group permissions called to enter this page.
        Group permissions are called (admin).
        """
        self.client.login(username="test", password="test")
        urls_list = [reverse_lazy('core:dashboard'),
                     reverse_lazy('core:dashboard_books_list'), reverse_lazy(
                         'core:dashboard_book_create_form'), reverse('core:dashboard_book_delete', args=[1]),
                     reverse_lazy('core:dashboard_students_list'), reverse('core:dashboard_student_delete', args=[1])]

        for url in urls_list:
            response = self.client.get(url)
            messages = [msg.message for msg in get_messages(
                response.wsgi_request) if msg.level == 40]  # 40 = ERROR
            self.assertRedirects(
                response, f"%s?next={url}" % (reverse_lazy("login")))
            self.assertIn(
                f"You are authenticated as {response.wsgi_request.user}, but are not authorized to access this page. Would you like to login to a different account?", messages)

    def test_dashboard_urls_authenticated_user_with_permission(self):
        """_summary_
        This test is to check if the dashboard url allows the user to access the page if he has group permissions to enter this page.
        Group permissions are called (admin).
        """
        self.client.login(username="test_admin", password="test")
        urls_list = [reverse_lazy('core:dashboard'),
                     reverse_lazy('core:dashboard_books_list'), reverse_lazy(
                         'core:dashboard_book_create_form'),
                     reverse_lazy('core:dashboard_students_list')]
        for url in urls_list:
            response = self.client.get(url)
            self.assertEqual(response.status_code, 200)

class ProfileUrlsTestcase(TestCase):
    @classmethod
    def setUpTestData(cls):
        user =User(username='test', email='ychag@example.com')
        user.set_password('test')
        user.save()
        
    def test_profile_url_redirecting_anonymous_user(self):
        response = self.client.get(reverse_lazy('core:profile'))
        self.assertRedirects(
            response, f"%s?next={reverse_lazy('core:profile')}" % (reverse_lazy('login')))

    def test_profile_url_authenticated_user(self):
        self.client.login(username="test", password="test")
        response = self.client.get(reverse_lazy('core:profile'))
        self.assertEqual(response.status_code, 200)
