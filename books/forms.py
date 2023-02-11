from django import forms
from .models import (BookIssue)


class BookIssueForm(forms.ModelForm):
    class Meta:
        model=BookIssue
        fields = ['book','student','borrow_date']