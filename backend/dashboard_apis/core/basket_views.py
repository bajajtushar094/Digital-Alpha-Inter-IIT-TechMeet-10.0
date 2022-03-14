from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from datetime import *

@api_view(["GET"])
def getBookmarks(request):
    """API endpoint for getting bookmarked companies
    
    Args: \n
        None
    
    Returns: \n
        company_details list[object]: details of all the companies provided
    """
    # user = request.user
    # print(user)
    # if not user.is_authenticated:
    #     return Response(
    #         {"error": {"message": "User not authenticated"}}, status=status.HTTP_401_UNAUTHORIZED
    #     )
    res = User.objects.filter(email="aman@test.com")
    if(len(res) == 0):
        return Response(
            {"error": {"message": "User not found"}}, status=status.HTTP_404_NOT_FOUND
        )
    user = res[0]
    return Response(
        {
        "error":None, 
        "data": user.bookmarked_companies.values()
        },  
        status=status.HTTP_200_OK
    )

@api_view(["GET"])
def getBookmarksWithFilings(request):
    """API endpoint for getting bookmarked companies with their filings
    
    Args: \n
        None
    
    Returns: \n
        companies list[object]: details of all the companies provided
        filings list[object]: all the filings of companies provided
    """
    # user = request.user
    # print(user)
    # if not user.is_authenticated:
    #     return Response(
    #         {"error": {"message": "User not authenticated"}}, status=status.HTTP_401_UNAUTHORIZED
    #     )
    res = User.objects.filter(email="aman@test.com")
    if(len(res) == 0):
        return Response(
            {"error": {"message": "User not found"}}, status=status.HTTP_404_NOT_FOUND
        )
    user = res[0]
    filings = {}
    for company in user.bookmarked_companies.all():
        filings[company.ticker] = company.filings.values()
    
    return Response(
        {
            "data": {
                "filings" : filings, 
                "companies": user.bookmarked_companies.values()
            },
            "error": None
        }, 
        status=status.HTTP_200_OK
    )

@api_view(["POST"])
def getComparisonData(request):
    """API endpoint for getting comparison data
    
    Args: \n
        tickers list[string]: list of tickers to compare
    
    Returns: \n
        companies list[object]: details of all the companies provided
        filings list[object]: all the filings of companies provided
    """
    tickers = request.data["tickers"]
    filings = {}
    companies = Company.objects.filter(ticker__in=tickers)
    for company in companies.all():
        filings[company.ticker] = company.filings.values()
    
    return Response(
        {
            "data": {
                "companies": companies.values(), 
                "filings": filings
            },
            "error": None
        }, 
        status=status.HTTP_200_OK
    )


@api_view(["GET"])
def getBaskets(request):
    """API endpoint for getting baskets
    
    Args: \n
        None
    
    Returns: \n
        baskets list[object]: details of all the baskets provided
    """
    # user = request.user
    # print(user)
    # if not user.is_authenticated:
    #     return Response(
    #         {"error": {"message": "User not authenticated"}}, status=status.HTTP_401_UNAUTHORIZED
    #     )
    res = User.objects.filter(email="aman@test.com")
    if(len(res) == 0):
        return Response(
            {"error": {"message": "User not found"}}, status=status.HTTP_404_NOT_FOUND
        )
    user = res[0]
    basketData = {}
    for basket in user.baskets.all():
        basketData[basket.name] = {
            "id": basket.id,
            "name": basket.name,
            "companies": basket.companies.values(),
            "companies_count": basket.companies.count()
        }

    return Response(
        {
        "error":None,
        "data": basketData
        },
        status=status.HTTP_200_OK
    )

@api_view(["GET"])
def getBasketDetails(request):
    """API endpoint for getting basket details
    
    Args: \n
        basket_id int: id of the basket
    
    Returns: \n
        basket_details object: details of the basket provided
        filings list[object]: all the filings of companies provided
    """
    # user = request.user
    # print(user)
    # if not user.is_authenticated:
    #     return Response(
    #         {"error": {"message": "User not authenticated"}}, status=status.HTTP_401_UNAUTHORIZED
    #     )
    basket_id = request.query_params["basket_id"]
    baskets = Basket.objects.filter(id=basket_id)
    if(len(baskets) == 0):
        return Response(
            {"error": {"message": "Basket not found"}}, status=status.HTTP_404_NOT_FOUND
        )
    basket = baskets[0]
    filings = {}
    for company in basket.companies.all():
        filings[company.ticker] = company.filings.values()

    companies = basket.companies.values()

    return Response(
        {
            "error": None,
            "data": {
                "basket": baskets.values()[0],
                "companies": companies,
                "filings": filings
            }
        },
        status=status.HTTP_200_OK
    )