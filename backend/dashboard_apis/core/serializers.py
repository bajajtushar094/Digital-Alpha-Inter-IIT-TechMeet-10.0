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

class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ['text', 'link']


class SummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = ['text', 'section_heading', 'polarity_score', 'sentiment_label']



class FilingSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    form_type = serializers.CharField(max_length=10)
    year = serializers.IntegerField(read_only=True)
    quarter = serializers.IntegerField(read_only=True)
    date = serializers.DateField()
    filelink = serializers.FileField()
    snippets = SnippetSerializer(many=True, read_only=True)
    summaries = SummarySerializer(many=True, read_only=True)

    class Meta:
        model = Filing
        fields = ['company','form_type','year','quarter','date','filelink','snippets','summaries']





