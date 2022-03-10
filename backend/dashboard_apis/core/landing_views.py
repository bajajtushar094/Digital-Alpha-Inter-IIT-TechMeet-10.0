import imp
from xml.etree.ElementInclude import include
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from django.core import serializers
from .models import *
import json
from .serializers import *

class getAllRecentFilings(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        
        try:
            filings = Filing.objects.all().order_by('-date')
        except:
            return Response(
                {"res":"Error while fetching filings of the company"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            data=filings.values(),
            status=status.HTTP_200_OK
        )

class getAllCompanies(APIView):  #returns company data along with filings and the key metrics for each filings
    def get(self, request, *args, **kwargs):
        try:
            companies = Company.objects.all().values()
            for company in companies:
                filings = Filing.objects.filter(company_id = company['ticker']).values()
                for filing in filings:
                    filing["key metrics"] = KeyMetric.objects.filter(company_id=company['ticker'], filing_id=filing['id']).values()
                company["filings"] = filings
        except:
            Response(
                {
                    "res":"Error while fetching the Company data"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response(
            data=companies,
            status=status.HTTP_200_OK
        )
            
