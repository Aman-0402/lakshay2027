from rest_framework import serializers
from .models import Lab, Booking, TeamMember, Partner


class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = ['id', 'name', 'slug', 'category', 'description', 'image', 'resources', 'available']


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'lab', 'name', 'email', 'date', 'status', 'created_at']
        read_only_fields = ['status', 'created_at']


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'photo', 'group', 'order']


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = ['id', 'name', 'logo', 'order']
