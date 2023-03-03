from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import (ListView, TemplateView, CreateView)
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User, Group
from django.http import (HttpRequest, JsonResponse,
                         Http404, HttpResponseRedirect)
from core.forms import (BookForm, UserForm, ProfileForm)
from django.core.exceptions import (ValidationError, ObjectDoesNotExist)
from django.contrib.auth.decorators import (login_required)
from authentication.utils import group_required
from books.models import (Book, BookIssue)
from django.contrib.messages.views import SuccessMessageMixin
from django.contrib import messages
from books.models import (BookIssue)


# Create your views here.
@method_decorator([login_required(login_url=reverse_lazy('login'))], name='dispatch')
class ProfileView(TemplateView):
    template_name = 'core/profile/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['issues_books_list'] = BookIssue.objects.filter(
            student=self.request.user.id, borrow_date=None)
        return context


@csrf_exempt
def profile_picture_update(request: HttpRequest):
    try:
        if request.method == 'POST':
            if request.user.is_authenticated:
                profile_form = ProfileForm(
                    files=request.FILES, instance=request.user.profile)
                if profile_form.is_valid():
                    profile_form.save()
                    return JsonResponse({'status': 'success', "message": "Profile picture updated"})
                else:
                    raise ValidationError(profile_form.errors)
            else:
                return JsonResponse({"status": "error", "error": ["You must be logged in to update your profile picture"]}, status=401)
        else:
            return HttpResponseRedirect(reverse_lazy('core:profile'))
    except ValidationError as error:
        return JsonResponse({"status": "error", "error": error.messages})


@csrf_exempt
def profile_update(request: HttpRequest):
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
                return JsonResponse({"status": "error", "error": ["You must be logged in to update your profile"]}, status=401)
        else:
            return HttpResponseRedirect(reverse_lazy('core:profile'))
    except ValidationError as error:
        return JsonResponse({"status": "error", "error": error.messages}, status=401)


@method_decorator([login_required(login_url=reverse_lazy('login')), group_required(['admin'], login_url=reverse_lazy('login'))], name='dispatch')
class DashboardView(TemplateView):
    template_name = 'core/dashboard/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['total_books'] = Book.objects.all().count()
        context['total_issue_books'] = BookIssue.objects.all().count()
        context['total_students'] = User.objects.filter(is_superuser=False, is_staff=False,
                                                        ).exclude(groups=(Group.objects.get(name="admin").pk)).count()
        return context


@method_decorator([login_required(login_url=reverse_lazy('login')), group_required(['admin'], login_url=reverse_lazy('login'))], name='dispatch')
class StudentListView(ListView):
    template_name = 'core/dashboard/students_list.html'
    context_object_name = 'students_list'

    def get_queryset(self):
        return User.objects.filter(is_superuser=False, is_staff=False,
                                   ).exclude(groups=(Group.objects.get(name="admin").pk))


@group_required(['admin'], login_url=reverse_lazy('login'))
@login_required(login_url=reverse_lazy('login'))
def student_delete(request: HttpRequest, pk: int):
    try:
        student = get_object_or_404(User, pk=pk)
        student.delete()
        messages.success(request, 'Student has been successfully deleted')
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
    except ObjectDoesNotExist:
        return Http404("Student does not exist")


@method_decorator([login_required(login_url=reverse_lazy('login')), group_required(['admin'], login_url=reverse_lazy('login'))], name='dispatch')
class BookListView(ListView):
    template_name = 'core/dashboard/books_list.html'
    context_object_name = 'books_list'
    model = Book


@group_required(['admin'], login_url=reverse_lazy('login'))
@login_required(login_url=reverse_lazy('login'))
def book_delete(request: HttpRequest, pk: int):
    try:
        book = get_object_or_404(Book, pk=pk)
        book.delete()
        messages.success(request, 'Book has been successfully deleted')
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
    except ObjectDoesNotExist:
        return Http404("Book does not exist")


@method_decorator([login_required(login_url=reverse_lazy('login')), group_required(['admin'], login_url=reverse_lazy('login'))], name='dispatch')
class BookCreateView(SuccessMessageMixin, CreateView):
    template_name = 'core/dashboard/book_form.html'
    form_class = BookForm
    success_url = reverse_lazy('core:dashboard_book_create_form')
    success_message = "Book has been successfully created"
