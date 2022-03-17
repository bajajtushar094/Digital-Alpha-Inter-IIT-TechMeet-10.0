import imp
from os import stat
from warnings import catch_warnings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .utils import *
from .models import *
from .serializers import *

def add_recently_viewed_company(user_id, company_ticker):
    MAX_RECENTLY_VIEWED_COMPANIES = 5
    try:
        user = User.objects.get(id=user_id)
        company = Company.objects.get(ticker=company_ticker)
        
        try:
            entry = RecentlyViewed.objects.get(user=user, company=company)
            entry.save()
            # print("hello")
        except Exception as e:
            # print(e)
            ids = RecentlyViewed.objects.order_by("-timestamp").values_list("pk", flat=True)[MAX_RECENTLY_VIEWED_COMPANIES-1:]
            RecentlyViewed.objects.filter(pk__in=list(ids)).delete()

            RecentlyViewed.objects.create(user=user, company=company)

    except Exception as e:
        # print(e)
        pass



class bookmarkCompanyView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        ticker = kwargs['ticker']

        company = get_company(ticker)
        if isinstance(company, Response):
            return company

        user_id = request.user.id
        user = User.objects.get(id=user_id)

        try:
            user.bookmarked_companies.add(company)
        except:
            return Response(
                {"res":"Error while adding the company"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            {"res":"Company Added!"},
            status=status.HTTP_200_OK
        )

class addToBasket(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = request.user.id
        user = User.objects.get(id=user_id)

        basket = Basket.objects.get_or_create(user=user)

        company = get_company(kwargs['ticker'])
        if isinstance(company, Response):
            return company

        try:
            basket.companies.add(company)
        except:
            return Response(
                {"res":"Not able to add company to basket"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


        return Response(
            {"res":"Company added in the basket of user"},
            status=status.HTTP_200_OK
        )

class getRecentFilings(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        company = get_company(kwargs['ticker'])
        if isinstance(company, Response):
            return company
        try:
            filings = Filing.objects.filter(company=company).order_by('-date')
        except:
            return Response(
                {"res":"Error while fetching filings of the company"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            data=filings.values(),
            status=status.HTTP_200_OK
        )


class getKeyMetrics(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):        
        company = get_company(kwargs['ticker'])
        metric_type = kwargs['metric_type']

        if isinstance(company, Response):
            return company

        try:
            metrics = KeyMetric.objects.filter(company=company, metric_type=metric_type)
        except:
            return Response(
                {"res":"Error while fetching filings of the company"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        metrics = metrics.values()

        return Response(
            data=metrics,
            status= status.HTTP_200_OK
        ) 

class getFilingFromMetric(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        id = kwargs['id']

        try:
            metric = KeyMetric.objects.get(id=id)
        except:
            return Response(
                {"res":"Error while extracting metrics"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        filing_id = metric.filing_id

        try:
            filing = Filing.objects.filter(id=filing_id)
        except:
            return Response(
                {"res":"Error while fetching filing"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            data=filing.values(),
            status = status.HTTP_200_OK
        )


        
        




