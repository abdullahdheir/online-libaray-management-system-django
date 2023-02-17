import os
from django.test import TestCase
from django.conf import settings
from books.models import (Book,BookIssue)
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth.models import User
from core.models import Profile
from datetime import (datetime,timedelta)

class BookModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        for i in range(10):
            Book.objects.create(image=cls.get_image_file(),title=f"test_title_{i}",description=f"test_description_{i}",author=f"test_author_{i}",quantity=10)

    @staticmethod
    def get_image_file():
        image = open(os.path.join(settings.BASE_DIR,
                     "core/tests/test_image.jfif"), "rb")
        return SimpleUploadedFile("test_image.jfif", image.read(), content_type="image/jfif")

    def test_book_model_if_data_exists(self):
        self.assertEqual(Book.objects.count(), 10)
        self.assertEqual(Book.objects.all()[0].title, "test_title_0")
        self.assertEqual(Book.objects.all()[0].description, "test_description_0")
        self.assertEqual(Book.objects.all()[0].author, "test_author_0")
        self.assertEqual(Book.objects.all()[0].quantity, 10)
        self.assertEqual(Book.objects.all()[0].image.name, "images/book/test_image.jfif")

    def test_book_str_method(self):
        except_string = "test_title_0"
        self.assertEqual(str(Book.objects.all()[0]), except_string)


class BookIssueModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Book.objects.create(title=f"test_title",description=f"test_description",author=f"test_author",quantity=10)
        User.objects.create(username="test_user",password="test_password")
        BookIssue.objects.create(book=Book.objects.get(pk=1),student=Profile.objects.get(pk=1))

    def test_issue__book_model_if_data_exists(self):
        self.assertEqual(BookIssue.objects.count(), 1)
        self.assertEqual(BookIssue.objects.get(pk=1).book, Book.objects.get(pk=1))
        self.assertEqual(BookIssue.objects.get(
            pk=1).student, Profile.objects.get(pk=1))

    def test_book_issue_str_method(self):
        issue = BookIssue.objects.get(pk=1)
        except_string = f"This book is issued by {issue.student.user.username}"
        self.assertEqual(str(issue), except_string)

"""     def test_borrow_fines(self):
        issue = BookIssue.objects.get(pk=1)
        date = datetime.now().date() + timedelta(days=15) """

