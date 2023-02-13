from django.test import TestCase
from core.models import Profile
from django.contrib.auth.models import User

class ProfileModelTestClass(TestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.create(first_name='Test', last_name='User',username='test', email='anpch@example.com')

    def test_profile_is_exists_signals(self):
        self.assertTrue(Profile.objects.filter(pk=1).exists())
    
    def test_string_method(self):
        profile = Profile.objects.get(pk=1)
        expected_string = profile.user.username
        self.assertEqual(str(profile), expected_string)
