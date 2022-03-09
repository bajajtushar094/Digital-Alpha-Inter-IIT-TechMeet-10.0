from csv import field_size_limit
from dataclasses import field
from enum import unique
from .models import *
from rest_framework import serializers

class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'recently_viewed_companies', 'bookmarked_companies')

class FilingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Filing
        fields='__all__'





