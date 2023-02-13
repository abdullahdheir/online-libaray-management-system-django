from django.urls import path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from . import views

app_name = "core"

urlpatterns = [
    path('', TemplateView.as_view(template_name='base.html'), name='home'),
    path('profile', views.ProfileView.as_view(), name='profile'),
    path('profile/update', views.profile_update, name='profile_update'),
    path('profile/picture/update', views.profile_picture_update, name='profile_picture_update'),
    path('dashboard', views.DashboardView.as_view(), name='dashboard'),
    path('dashboard/students', views.StudentListView.as_view(), name='dashboard_students_list'),
    path('dashboard/students/<int:pk>/delete',
         views.student_delete, name='dashboard_student_delete'),
    path('dashboard/books', views.BookListView.as_view(), name='dashboard_books_list'),
    path('dashboard/books/add', views.BookCreateView.as_view(),
         name='dashboard_book_create_form'),
    path('dashboard/books/<int:pk>/delete',
         views.book_delete, name='dashboard_book_delete'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
