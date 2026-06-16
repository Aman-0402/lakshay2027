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
    list_display = ['user', 'lab', 'date', 'status', 'reviewed_by']
    list_filter = ['status', 'date']
    search_fields = ['user__username', 'user__email', 'reason']
    actions = ['approve_bookings', 'reject_bookings']

    @admin.action(description='Approve selected bookings')
    def approve_bookings(self, request, queryset):
        queryset.update(status='approved', reviewed_by=request.user)

    @admin.action(description='Reject selected bookings')
    def reject_bookings(self, request, queryset):
        queryset.update(status='rejected', reviewed_by=request.user)


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'group', 'order']
    list_filter = ['group']


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
