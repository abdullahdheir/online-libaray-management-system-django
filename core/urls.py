from django.urls import path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from . import views
from django.views.decorators.csrf import csrf_exempt
app_name = "core"

urlpatterns = [
    path('',TemplateView.as_view(template_name='base.html'),name='home'),
    path('profile',TemplateView.as_view(template_name='core/profile/index.html'),name='profile'),
    path('profile/update', views.update_profile, name='update_profile'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)