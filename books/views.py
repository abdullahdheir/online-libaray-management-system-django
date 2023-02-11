from django.shortcuts import render
from django.views.generic import (ListView, DetailView)
from .models import (Book)
from core.models import Profile
# Create your views here.



class BookListView(ListView):
    template_name = 'books/book_list.html'
    model = Book
    context_object_name = 'book_list'
    # def get_context_data(self, **kwargs) -> dict:
    #     context = super().get_context_data(**kwargs)
    #     context['books'] = context['object_list']
    #     return context


class BookDetailView(DetailView):
    template_name = 'books/book_detail.html'
    model = Book
    