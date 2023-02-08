from django.db import models
from django.contrib.auth.models import User
from datetime import (timedelta, datetime)
# Create your models here.


class Student(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    picture = models.ImageField(
        blank=True, null=True, upload_to='images/student_profile/')
    fines = models.SmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.user.username


class Admin(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )

    def __str__(self) -> str:
        return self.user.username


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

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    issue_date = models.DateField(auto_now=True)
    due_date = models.DateField(default=due_date())
    borrow_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"This book is issued by {self.student.user.username}"
