from django import template
from django.contrib.auth.models import (Group)

register = template.Library()


@register.filter(name='has_group')
def has_group(user, group):
    if user.is_authenticated:
        if user.is_superuser:
            return True
        return user.groups.filter(name=group).exists()
    return False
