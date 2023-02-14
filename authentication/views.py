from django.shortcuts import render
from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView, LogoutView, PasswordChangeView, PasswordResetView, PasswordResetConfirmView
from .forms import (UserLoginForm, UserRegisterForm)
from django.views.generic import CreateView
from django.contrib.messages import add_message, SUCCESS
from django.contrib.auth import login
from django.contrib.messages.views import SuccessMessageMixin
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.forms import PasswordChangeForm
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from django.contrib.auth import update_session_auth_hash
# Create your views here.

@csrf_exempt
def password_change(request):
    try:
        if request.user.is_authenticated:
            if request.method == 'POST':
                print(request.POST['new_password2'])
                form = PasswordChangeForm(user=request.user, data=request.POST)
                if form.is_valid():
                    form.save()
                    update_session_auth_hash(request, form.user)
                    return JsonResponse({"status": "success"})
                else:
                    print(form.cleaned_data)
                    raise ValidationError(form.errors.as_json())
    except ValidationError as error:
        return JsonResponse({"status": "error", "error": error.messages})


class UserLoginView(SuccessMessageMixin,LoginView):
    template_name = 'login.html'
    form_class = UserLoginForm
    success_message="Login successfully"


class UserRegisterView(CreateView):
    template_name = 'register.html'
    form_class = UserRegisterForm
    success_url = reverse_lazy('core:home')

    def form_valid(self, form):
        result = super().form_valid(form)
        user = form.save()
        login(self.request, user)
        add_message(
            self.request, message=f"Hi {user}, thx for registration. Now you can issue any books are you want.", level=SUCCESS
        )
        return result


class UserLogoutView(SuccessMessageMixin,LogoutView):
    success_message = "Logout successfully"

class UserPasswordChangeView(PasswordChangeView):
    pass


class UserPasswordResetView(SuccessMessageMixin, PasswordResetView):

    template_name = 'password_reset.html'
    success_url = reverse_lazy('login')
    success_message = f"If you entered your email, we will send you an email with a link to reset your password"


class UserPasswordResetConfirmView(SuccessMessageMixin, PasswordResetConfirmView):
    template_name = 'password_reset_confirm.html'
    success_url = reverse_lazy('login')
    success_message = "Your password has been reset successfully"
