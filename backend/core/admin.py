from django.contrib import admin
from .models import Lab, Booking, TeamMember, Partner


@admin.register(Lab)
class LabAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'available']
    list_filter = ['category', 'available']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['name', 'lab', 'date', 'status']
    list_filter = ['status', 'date']
    search_fields = ['name', 'email']


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'group', 'order']
    list_filter = ['group']


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
