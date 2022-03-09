import imp
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import *
import json

@api_view(['POST'])
def searchCompanies(request):
    """API endpoint for searching companies

    Args:
        tickers (list[string]): Unique ids to identify the company

    Returns:
        company details list[object]: details of all the companies provided
    """

    tickers = request.data.get('tickers')

    if not tickers:
        return Response(
            {"error":{"message": "No Ticker Found"}},
            status=status.HTTP_404_NOT_FOUND
        )

    companies = Company.objects.filter(ticker__in=tickers)

    if not companies:
        return Response(
            {"error":{"message": "No Company Found"}},
            status=status.HTTP_404_NOT_FOUND
        )
    
    notFound = []
    for ticker in tickers:
        if(ticker not in [company.ticker for company in companies]):
            notFound.append(ticker)
    error = None
    if(len(notFound)):
        errorMsg = "No Company Found for Tickers: " + ", ".join(notFound)
        error = {"message": errorMsg, "data": notFound}
 
    return Response(
        {
            "error": error,
            "data": companies.values() 
        },
        status=status.HTTP_200_OK
    )

