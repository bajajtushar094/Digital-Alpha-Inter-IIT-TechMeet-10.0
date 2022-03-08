import imp
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import *

class bookmarkCompanyView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):

        print("Request", request)
        ticker = kwargs['ticker']

        if ticker == "":
            return Response(
                {"res":"No Ticker Found"},
                status=status.HTTP_404_NOT_FOUND
            )


        try:
            company = Company.objects.get(ticker=ticker)
        except:
            return Response(
                {"res":"Error while fetching company"},
                status=status.HTTP_404_NOT_FOUND
            )

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


        
        




