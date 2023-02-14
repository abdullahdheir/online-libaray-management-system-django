from django.shortcuts import get_object_or_404
from django.views.generic import (ListView, DetailView)
from .models import (Book, BookIssue)
from django.http import (HttpRequest, JsonResponse, HttpResponseRedirect)
from django.views.decorators.csrf import csrf_exempt
from .forms import (BookIssueForm)
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.http.request import QueryDict
from django.http import Http404
from django.contrib import messages
from datetime import datetime
# Create your views here.


class BookListView(ListView):
    template_name = 'books/book_list.html'
    model = Book
    context_object_name = 'book_list'

class BookDetailView(DetailView):
    template_name = 'books/book_detail.html'
    model = Book

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['issued'] = BookIssue.objects.filter(
            book=self.kwargs['pk'], student=self.request.user.id, borrow_date=None).exists()
        return context

@csrf_exempt
def book_borrow(request: HttpRequest, pk):
    try:
        book = get_object_or_404(BookIssue, pk=pk)
        days = datetime.today().date()-book.issue_date
        d = days.days
        fine = 0
        if d > 14:
            day = d-14
            fine = day*5
        book.student.fines += fine
        book.student.save()
        book.borrow_date = datetime.now()
        book.save()
        messages.success(request, f'You have borrowed {book.book.title}')
        return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
    except ObjectDoesNotExist:
        return Http404

@csrf_exempt
def book_issue(request: HttpRequest):
    try:
        if request.user.is_authenticated:
            if request.user.groups.filter(name="admin").exists():
                raise ValidationError('Cannot issue a book for an admin')
            if request.method == 'POST':
                post = QueryDict(mutable=True)
                post.appendlist('book', request.POST['book'])
                post.appendlist('student', request.user.id)
                form = BookIssueForm(post)
                if form.is_valid():
                    form.save()
                    return JsonResponse({'status': 'success', 'message': 'Book issued successfully'})
                else:
                    raise ValidationError(form.errors.as_json())
        else:
            raise ValidationError('You must be logged in to issue books')
    except ValidationError as e:
        return JsonResponse({'status': 'error', 'error': e.messages})
