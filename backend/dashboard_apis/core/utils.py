from .models import *
from rest_framework.response import Response
from rest_framework import status

def get_company(ticker):
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

    return company

