from django.shortcuts import render, get_object_or_404
from django.views.generic import UpdateView
from core.models import (Profile)
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.http import HttpRequest, HttpResponse, JsonResponse
from core.forms import (ProfileForm, UserForm)
from django.core.exceptions import ValidationError
import json

# Create your views here.


@csrf_exempt
def update_profile(request: HttpRequest):
    try:
        if request.method == 'POST':
            if request.user.is_authenticated:
                user_form = UserForm(request.POST)
                if user_form.is_valid():
                    user = request.user
                    user.email = user_form.cleaned_data['email'] or user.email
                    user.first_name = user_form.cleaned_data['first_name'] or user.first_name
                    user.last_name = user_form.cleaned_data['last_name'] or user.last_name
                    user.username = user_form.cleaned_data['username'] or user.username
                    user.save()
                    return JsonResponse({'status': 'success', "data": {
                        "email": user.email,
                        "username": user.username,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    }})
                else:
                    raise ValidationError(user_form.errors.as_json())
            else:
                raise ValidationError(
                    'You must be logged in to update your profile')
    except ValidationError as error:
        return JsonResponse({"status": "error", "error": error.messages})

