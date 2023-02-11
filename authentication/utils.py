from django.http import HttpRequest
from django.urls import reverse_lazy
from django.contrib import messages
from functools import wraps
from django.contrib.auth.views import redirect_to_login

def group_required(groups:list, login_url=None):
    """
    This decorator checks if the user is has a one of the given groups.
    If not, it redirects to the login page.
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request:HttpRequest, *args, **kwargs):
            if request.user.groups.filter(name__in=groups).exists() or request.user.is_superuser:
                return view_func(request, *args, **kwargs)
            messages.error(
                request, f'You are authenticated as {request.user}, but are not authorized to access this page. Would you like to login to a different account?')
            if login_url is not None:
                return redirect_to_login(request.get_full_path(),login_url)
            else:
                return redirect_to_login(request.get_full_path(),reverse_lazy('login'))
                
        return _wrapped_view
    return decorator
