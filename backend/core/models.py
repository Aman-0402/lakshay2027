from django.conf import settings
from django.db import models
from django.utils.text import slugify


class Lab(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True, blank=True)
    category = models.CharField(max_length=60)
    description = models.TextField()
    image = models.ImageField(upload_to='labs/', blank=True, null=True)
    resources = models.JSONField(default=list, blank=True, help_text='List of strings, e.g. ["2 ROBOT", "30 CPU"]')
    available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    lab = models.ForeignKey(Lab, on_delete=models.CASCADE, related_name='bookings')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    date = models.DateField()
    reason = models.TextField(help_text='Project/use-case reason — required for admin approval')
    status = models.CharField(max_length=12, choices=STATUS_CHOICES, default='pending')
    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_bookings'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user} → {self.lab.name} on {self.date} ({self.status})'


class TeamMember(models.Model):
    GROUP_CHOICES = [
        ('leadership', 'Leadership & Mentorship'),
        ('campus_manager', 'Campus Manager'),
        ('trainer', 'Trainer'),
    ]

    name = models.CharField(max_length=120)
    role = models.CharField(max_length=160)
    photo = models.ImageField(upload_to='team/', blank=True, null=True)
    group = models.CharField(max_length=20, choices=GROUP_CHOICES, default='leadership')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['group', 'order', 'name']

    def __str__(self):
        return f'{self.name} ({self.get_group_display()})'


class Partner(models.Model):
    name = models.CharField(max_length=160)
    logo = models.ImageField(upload_to='partners/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name
