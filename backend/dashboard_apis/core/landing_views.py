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

        print("Filing Values:",filings.values())

        filings_list = []

        for i in filings.values():
            metrics = KeyMetric.objects.filter(filing=i['id'])

            # i['metrics'] = {
            #     'metric_type':metrics.values()['metric_type'],
            #     'metric_value':metrics.values()['metric_value'],
            #     'metric_unit':metrics.values()['metric_unit']
            # }

            metrics_list = []
            for j in metrics.values():
                metric = {
                    'metric_type':j['metric_type'],
                    'metric_value':j['metric_value'],
                    'metric_unit':j['metric_unit']
                }
                metrics_list.append(metric)

            i['metrics'] = metrics_list
            filings_list.append(i)
        return Response(
            data=filings_list,
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
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            user = User.objects.get(id=kwargs['user_id'])
            # print(user)
            # print(user[0].bookmarked_companies.all().values())
            
            # for index in range(len(bookmarked_companies)):
            #     bookmarked_companies_json[index]["filings"] = bookmarked_companies[index].filing_set.all().values()
        except:
            Response(
                {
                    "res":"Error while fetching the Company data"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # companies = user.bookmarked_companies.all().values()
        # print("Companies:", companies)

        # for i in companies:
            
        return Response(
            data=user.bookmarked_companies.all().values(),
            status=status.HTTP_200_OK
        )      

class recentlyViewedCompanies(APIView):
    def get(self, request, *args, **kwargs):
        try:
            user = User.objects.filter(email=kwargs['user_id'])
            print(user)
            print(user[0].recently_viewed_companies.all().values())
            
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
            data=user[0].recently_viewed_companies.all().values(),
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
            data=companies.company.all().values(),
            status=status.HTTP_200_OK
        )   

# class getTop5(APIView):
#     def get(self, request, *args, **kwargs):
#         try:
#             companies = Filing.objects.order_by('-date').values('company_id').distinct()
#             print(companies.values())
#         except:
#             Response(
#                 {
#                     "res":"Error while fetching the Company data"
#                 },
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
#         return Response(
#             data=companies.values(),
#             status=status.HTTP_200_OK
#         )   