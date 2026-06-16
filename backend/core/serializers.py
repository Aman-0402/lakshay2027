from datetime import date, timedelta

from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import Lab, Booking, TeamMember, Partner


class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = ['id', 'name', 'slug', 'category', 'description', 'image', 'resources', 'available']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'is_staff']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class BookingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    lab_name = serializers.CharField(source='lab.name', read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'lab', 'lab_name', 'user', 'date', 'reason', 'status', 'reviewed_by', 'created_at']
        read_only_fields = ['status', 'reviewed_by', 'created_at']

    def validate_date(self, value):
        today = date.today()
        max_date = today + timedelta(days=14)
        if value < today:
            raise serializers.ValidationError('Booking date cannot be in the past.')
        if value > max_date:
            raise serializers.ValidationError('Bookings only allowed up to 2 weeks in advance.')
        return value


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'photo', 'group', 'order']


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = ['id', 'name', 'logo', 'order']
