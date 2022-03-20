from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from datetime import datetime
from .choices import *
from .utils import *


@api_view(["GET"])
def getBookmarks(request):
    """API endpoint for getting bookmarked companies
    
    Args: \n
        None
    
    Returns: \n
        company_details list[object]: details of all the companies provided
    """
    user = request.user
    if not user.is_authenticated:
        return Response(
            {"error": {"message": "User not authenticated"}}, status=status.HTTP_401_UNAUTHORIZED
        )
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
    user = request.user
    if not user.is_authenticated:
        return Response(
            {"error": {"message": "User not authenticated"}}, status=status.HTTP_401_UNAUTHORIZED
        )
    res = User.objects.filter(email= user)
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

def getDate(dateS):
    return dateS + '-01'

def simpleDate(date):
    # print(date, f'{str(date.year)}-{str(date.month)}-01')
    return f'{str(date.year)}-{str(date.month)}-01'

def getComparisonDataUtil(request):
    # print("Request data: ",request.data)
    tickers = request.data["tickers"]
    start_date = request.data["time_start"]
    end_date = request.data["time_end"]
    metric_type = request.data["metric_type"]

    dates = KeyMetric.objects.filter(date__range=[start_date, end_date], company__ticker=tickers[0], isYearly=False, metric_type=metric_type).values("date").distinct()

    # print(dates)
    metrices = []
    for date in dates:
        # print(date, str(date["date"]))
        metrices.append({"date": str(date["date"])})
        metrices_l = KeyMetric.objects.filter(company__ticker__in=tickers, date=date['date'], isYearly=False, metric_type=metric_type)
        # print(metrices_l)
        for ticker in tickers:
            metrices[-1][ticker] = metrices_l.get(company__ticker=ticker).metric_value
            

    print("Metrics",metrices)
    for i in metrices:
        # i['date'] = i['date'].strftime("%d-%B-%Y")
        date_parts = i['date'].split('-')
        print("DateTime",MONTH_MAPPING[date_parts[1]])
        i['date'] = MONTH_MAPPING[date_parts[1]]+' '+date_parts[0]

    return metrices


@api_view(["POST"])
def getComparisonDataCSV(request):
    # print("Request data: ",request.data)
    tickers = request.data["tickers"]
    start_date = request.data["time_start"]
    end_date = request.data["time_end"]
    metric_type = request.data["metric_type"]

    dates = KeyMetric.objects.filter(date__range=[start_date, end_date], company__ticker=tickers[0], isYearly=False).values("date").distinct()

    # print(dates)
    metrices = []
    for date in dates:
        # print(date, str(date["date"]))
        metrices.append({"date": str(date["date"])})
        metrices_l = KeyMetric.objects.filter(company__ticker__in=tickers, date=date['date'], isYearly=False)
        # print(metrices_l)
        for ticker in tickers:
            metrices[-1][ticker] = metrices_l.get(company__ticker=ticker).metric_value
            

    # print("Metrics",metrices)
    if len(metrices) > 0 :
        for i in metrices:
            # i['date'] = i['date'].strftime("%d-%B-%Y")
            date_parts = i['date'].split('-')
            # print("DateTime",MONTH_MAPPING[date_parts[1]])
            i['date'] = MONTH_MAPPING[date_parts[1]]+' '+date_parts[0]
        cols = metrices[0].keys()
        return csvResponse(metrices, cols, cols, dic=True)
    else:
        return HttpResponse('The metric list is empty', status=404)

@api_view(["POST"])
def getComparisonData(request):
    """API endpoint for getting comparison data
    
    Args: \n
        tickers list[string]: list of tickers to compare
    
    Returns: \n
        # companies list[object]: details of all the companies provided
        # filings list[object]: all the filings of companies provided
        metrices[]
    """
    
    # print("Request data: ",request.data)
    tickers = request.data["tickers"]
    start_date = request.data["time_start"]
    end_date = request.data["time_end"]
    metric_type = request.data["metric_type"]

    dates = KeyMetric.objects.filter(date__range=[start_date, end_date], company__ticker=tickers[0], isYearly=False, metric_type=metric_type).values("date").distinct()

    # print("Possible Dates are: ",dates)
    metrices = []
    for date in dates:
        # print(date, str(date["date"]))
        metrices.append({"date": str(date["date"])})
        metrices_l = KeyMetric.objects.filter(company__ticker__in=tickers, date=date['date'], isYearly=False, metric_type=metric_type)
        # print(metrices_l)
        for ticker in tickers:
            metrices[-1][ticker] = metrices_l.get(company__ticker=ticker).metric_value
            

    # print("Metrics",metrices)
    for i in metrices:
        # i['date'] = i['date'].strftime("%d-%B-%Y")
        date_parts = i['date'].split('-')
        # print("DateTime",MONTH_MAPPING[date_parts[1]])
        i['date'] = MONTH_MAPPING[date_parts[1]]+' '+date_parts[0]
    
    # # metrices = []
    # for ticker in tickers:
    #     for 
    #     metrices[]
    #     metrices_l = KeyMetric.objects.filter(company__ticker=ticker, date>=start_time, date<=end_time, yearly=False, metric_type=metric_type)
    #     metrices.append(metrices_l)
    

    
    return Response(
        {
            "data": metrices,
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
    user = request.user
    # print(user)
    if not user.is_authenticated:
        return Response(
            {"error": {"message": "User not authenticated"}}, status=status.HTTP_401_UNAUTHORIZED
        )
    res = User.objects.filter(email= user)
    if(len(res) == 0):
        return Response(
            {"error": {"message": "User not found"}}, status=status.HTTP_404_NOT_FOUND
        )
    user = res[0]
    basketData = []
    for basket in user.baskets.all():
        print("Basket", basket)
        basketData.append({
            "id": basket.id,
            "name": basket.name,
            "companies": basket.companies.values(),
            "companies_count": basket.companies.count()
        })
    # print(basketData)
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
    user = request.user
    if not user.is_authenticated:
        return Response(
            {"error": {"message": "User not authenticated"}}, status=status.HTTP_401_UNAUTHORIZED
        )
    basket_id = request.query_params["basket_id"]
    baskets = Basket.objects.filter(id=basket_id)
    if(len(baskets) == 0):
        return Response(
            {"error": {"message": "Basket not found"}}, status=status.HTTP_404_NOT_FOUND
        )
    basket = baskets[0]
    if(basket.user != user):
        return Response(
            {"error": {"message": "Not authorized for accessing this basket"}}, status=status.HTTP_404_NOT_FOUND
        )
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

@api_view(["POST"])
def createBasket(request):
    """API endpoint for creating a basket
    
    Args: \n
        name string: name of the basket
        tickers list[string]: list of companies to add to the basket
    
    Returns: \n
        Null
    """
    user = request.user
    if not user.is_authenticated:
        return Response(
            {"error": {"message": "User not authenticated"}}, status=status.HTTP_401_UNAUTHORIZED
        )
    name = request.data["name"]
    tickers = request.data["tickers"]
    companies = Company.objects.filter(ticker__in=tickers)
    user = User.objects.get(email= user)
    basket = Basket(name=name, user= user)
    basket.save()
    basket.companies.set(companies)

    return Response(status=status.HTTP_200_OK)

@api_view(["POST"])
def updateBasketName(request):
    """API endpoint for updating a basket name
    
    Args: \n
        basket_id (int): id of the basket
        name (string): new name of the basket
    
    Returns: \n
        Null
    """
    user = request.user
    if not user.is_authenticated:
        return Response(
            {"error": {"message": "User not authenticated"}}, status=status.HTTP_401_UNAUTHORIZED
        )
    basket_id = request.data["basket_id"]

    basket = Basket.objects.get(id=basket_id)
    if(basket.user != user):
        return Response(
            {"error": {"message": "Not authorized for accessing this basket"}}, status=status.HTTP_404_NOT_FOUND
        )
    basket.name = request.data["name"]
    basket.save()

    return Response({"message": "Basket updated"}, status=status.HTTP_200_OK)


@api_view(["POST"])
def deleteBasket(request):
    """API endpoint for deleting a basket
    
    Args: \n
        basket_id (int): id of the basket
    
    Returns: \n
        Null
    """
    user = request.user
    if not user.is_authenticated:
        return Response(
            {"error": {"message": "User not authenticated"}}, status=status.HTTP_401_UNAUTHORIZED
        )
    basket_id = request.data["basket_id"]
    basket = Basket.objects.get(id=basket_id)
    if(basket.user != user):
        return Response(
            {"error": {"message": "Not authorized for accessing this basket"}}, status=status.HTTP_404_NOT_FOUND
        )
    basket.delete()

    return Response({"message": "Basket deleted"}, status=status.HTTP_200_OK)



@api_view(["POST"])
def insertIntoBasket(request):
    user = request.user
    if not user.is_authenticated:
        return Response(
            {"error": {"message": "User not authenticated"}}, status=status.HTTP_401_UNAUTHORIZED
        )

    try:
        ticker = request.data['ticker']
        company = Company.objects.get(ticker=ticker)
        basketIDs = request.data['basketID']
        # print("--", ticker)
        for basketID in basketIDs:
            basket = Basket.objects.get(id=basketID)

            basket.companies.add(company)
            basket.save()

        return Response({"message": "Basket updated"}, status=status.HTTP_200_OK)

    except Exception as e:
        # print(e)
        return Response(
            {"error": {"message": "Wrong basket or ticker"}}, status=status.HTTP_404_NOT_FOUND
        )