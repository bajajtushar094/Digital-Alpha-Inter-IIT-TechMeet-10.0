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
            
class getAllBaskets(APIView): # ask doubt regarding fine details as the company data is not beung attched while sending the basket individual data
    def get(self, request, *args, **kwargs):
        try:
            user =User.objects.filter(email=kwargs['user_id']).values()[0]
            baskets = Basket.objects.filter(user_id = user['id'])
            baskets_json = baskets.values()
            for index in range(len(baskets_json)):
                baskets_json[index]["companies"] = baskets[index].companies.all().values()
        except:
            Response(
                {
                    "res":"Error while fetching the Company data"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response(
            data=baskets_json,
            status=status.HTTP_200_OK
        )

class bookmarkedCompanies(APIView):
    def get(self, request, *args, **kwargs):
        try:
            user = User.objects.filter(email=kwargs['user_id'])
            print(user)
            print(user[0].bookmarked_companies.all().values())
            
            # for index in range(len(bookmarked_companies)):
            #     bookmarked_companies_json[index]["filings"] = bookmarked_companies[index].filing_set.all().values()
        except:
            Response(
                {
                    "res":"Error while fetching the Company data"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response(
            data=user[0].bookmarked_companies.all().values(),
            status=status.HTTP_200_OK
        )      

class recentlyViewedCompanies(APIView):
    def get(self, request, *args, **kwargs):
        try:
            user = User.objects.filter(id=kwargs['user_id'])
            print(user)
            print(user[0].recently_viewed_companies.all())
            
            # for index in range(len(bookmarked_companies)):
            #     bookmarked_companies_json[index]["filings"] = bookmarked_companies[index].filing_set.all().values()
        except:
            Response(
                {
                    "res":"Error while fetching the Company data"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response(
            data=user[0].recently_viewed_companies.all(),
            status=status.HTTP_200_OK
        )   

class recentlyFiled(APIView):
    def get(self , request, *args, **kwargs):
        try:
            companies = Filing.objects.order_by('-date').values('company_id').distinct()
            print(companies.values())
        except:
            Response(
                {
                    "res":"Error while fetching the Company data"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response(
            data=companies.values(),
            status=status.HTTP_200_OK
        )   
