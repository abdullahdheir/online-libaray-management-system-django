from django.urls import path
from . import views

app_name = "books"

urlpatterns = [
    path('',views.BookListView.as_view(),name='book_list'),
    path('<int:pk>',views.BookDetailView.as_view(),name='book_detail'),
]
