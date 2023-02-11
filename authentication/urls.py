from django.urls import path
from django.contrib.auth.views import PasswordChangeDoneView, PasswordChangeView, PasswordResetCompleteView, PasswordResetView, PasswordResetConfirmView, PasswordResetDoneView
from . import views
from django.urls import reverse_lazy


urlpatterns = [
    path('login', views.UserLoginView.as_view(), name='login'),
    path('register', views.UserRegisterView.as_view(), name='register'),
    path('logout', views.UserLogoutView.as_view(), name='logout'),
    # form change password from profile (with login)
    path('password_change', PasswordChangeView.as_view(
    ), name='password_change'),  # template_name='change-password.html'
    # changed password successfully from profile
    path('password_change/done', PasswordChangeDoneView.as_view(),
         name='password_change_done'),
    
    # form reset password send email notification (without login)
    path('password_reset', views.UserPasswordResetView.as_view(
    ), name='password_reset'),
    path('password_reset/done', PasswordResetDoneView.as_view(),
         name='password_reset_done'),
    path('reset/<uidb64>/<token>', views.UserPasswordResetConfirmView.as_view(),
         name='password_reset_confirm'),
    path('reset/done', PasswordResetCompleteView.as_view(),
         name='password_reset_complete'),
    path('api/password_change', views.password_change, name='api_password_change'),
]
