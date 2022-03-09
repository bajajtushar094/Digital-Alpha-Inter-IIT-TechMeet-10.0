import imp
from warnings import catch_warnings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .utils import *
from .models import *

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


        
        




