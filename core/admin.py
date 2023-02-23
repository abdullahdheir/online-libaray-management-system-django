from django.contrib import admin
from django.db.models.signals import post_save,post_delete,pre_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import (Profile)
import os
# Register your models here.
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        user_profile = Profile(user=instance)
        user_profile.save()
@receiver(post_delete, sender=Profile)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes profile picture from filesystem
    when corresponding `Profile(User)` object is deleted.
    instance == Profile Object 
    """
    if instance.picture:
        if os.path.isfile(instance.picture.path):
            os.remove(instance.picture.path)
@receiver(post_delete, sender=Profile)
def auto_delete_profile_picture_on_delete(sender, instance, **kwargs):
    """
    Deletes profile picture from filesystem
    when corresponding `Profile(User)` object is deleted.
    instance == Profile Object that was deleted
    """
    if instance.picture:
        if os.path.isfile(instance.picture.path):
            os.remove(instance.picture.path)

@receiver(pre_save, sender=Profile)
def auto_delete_profile_picture_on_update(sender, instance, **kwargs):
    """
    Deletes profile picture from filesystem
    when corresponding `Profile(User)` object is deleted.
    instance == Profile Object after update
    old_profile == Profile Object before update
    """
    if instance.picture:
        old_profile = Profile.objects.get(pk=instance.pk)
        if old_profile.picture.path != instance.picture.path:
            if os.path.isfile(old_profile.picture.path):
                os.remove(old_profile.picture.path)

admin.site.register(Profile)
