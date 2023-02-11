from django.db import models
from datetime import (timedelta, datetime)
from core.models import Profile
# Create your models here.

class Book(models.Model):
    image = models.ImageField(blank=False, upload_to='images/book/')
    title = models.CharField(max_length=150)
    description = models.TextField()
    author = models.CharField(max_length=80)
    quantity = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title


def due_date():
    return datetime.today() + timedelta(days=14)


class BookIssue(models.Model):

    student = models.ForeignKey(Profile, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    issue_date = models.DateField(auto_now=True)
    due_date = models.DateField(default=due_date())
    borrow_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"This book is issued by {self.student.user.username}"
