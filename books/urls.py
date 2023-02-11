from django.urls import path
from . import views

app_name = "books"

urlpatterns = [
    path('',views.BookListView.as_view(),name='book_list'),
    path('<int:pk>',views.BookDetailView.as_view(),name='book_detail'),
    path('issue',views.book_issue,name='book_issue'),
    path('<int:pk>/borrow', views.book_borrow, name='book_borrow'),

]
