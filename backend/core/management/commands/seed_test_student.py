from django.contrib.auth.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Create a test student account for booking flow testing'

    def handle(self, *args, **options):
        username = 'student1'
        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING(f'{username} already exists.'))
            return
        User.objects.create_user(
            username=username,
            email='student1@lakshya2047.com',
            password='Student@123',
            first_name='Test Student',
            is_staff=False,
        )
        self.stdout.write(self.style.SUCCESS(f'Created student: {username} / Student@123'))
