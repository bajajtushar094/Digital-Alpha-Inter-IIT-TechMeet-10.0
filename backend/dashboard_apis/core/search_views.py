from sqlite3 import complete_statement
from django.http import response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models.functions import Concat
from django.db.models import Value, TextField, F, ExpressionWrapper
from .models import *
from datetime import *
import re
from fuzzywuzzy import fuzz, process

@api_view(["POST"])
def searchCompanies(request):
    """API endpoint for searching companies

    Args: \n
        tickers (list[string]): Unique ids to identify the company

    Returns: \n
        company_details list[object]: details of all the companies provided
    """

    tickers = request.data.get("tickers")
    print(tickers)

    if not tickers:
        return Response(
            {"error": {"message": "No Ticker Found"}}, status=status.HTTP_404_NOT_FOUND
        )

    companies = Company.objects.filter(ticker=tickers)

    if not companies:
        return Response(
            {"error": {"message": "No Company Found"}}, status=status.HTTP_404_NOT_FOUND
        )

    notFound = []
    for ticker in tickers:
        if ticker not in [company.ticker for company in companies]:
            notFound.append(ticker)
    error = None
    if len(notFound):
        errorMsg = "No Company Found for Tickers: " + ", ".join(notFound)
        error = {"message": errorMsg, "data": notFound}

    return Response(
        data=companies.values(), 
        status=status.HTTP_200_OK
    )


@api_view(["POST"])
def searchFillings(request):
    """API endpoint for searching fillings of given companies
    Args: \n
        tickers (list[string]): Unique ids to identify the company \n
        form_type (list[string]): types of filling to include; options- 10K, 10Q, 8K \n
        time_start (string): start date of the filling; format- YYYY-MM-DD \n
        time_end (string): end date of the filling; format- YYYY-MM-DD \n
    Returns: \n
        fillings list[object]: details of all the fillings provided
    """

    tickers = request.data.get("tickers")
    form_type = request.data.get("form_type")
    time_start = request.data.get("time_start")
    time_end = request.data.get("time_end")
    if time_start:
        time_start = time_start.split("-")
        time_start = date(int(time_start[0]), int(time_start[1]), int(time_start[2]))
    if time_end:
        time_end = time_end.split("-")
        time_end = date(int(time_end[0]), int(time_end[1]), int(time_end[2]))

    if not tickers:
        return Response(
            {"error": {"message": "No Ticker Found"}}, status=status.HTTP_404_NOT_FOUND
        )

    companies = Company.objects.filter(ticker__in=tickers)

    filings = {company.ticker: company.filings.values() for company in companies}

    res = {}
    for company in filings.keys():
        res[company] = []
        for filing in filings[company]:
            if (
                ((not form_type) or (form_type and filing["form_type"] in form_type))
                and ((not time_start) or (time_start and filing["date"] >= time_start))
                and ((not time_end) or (time_end and filing["date"] <= time_end))
            ):
                res[company].append(filing)

    notFound = []
    for ticker in tickers:
        if ticker not in [company.ticker for company in companies]:
            notFound.append(ticker)
    error = None
    if len(notFound):
        errorMsg = "No Company Found for Tickers: " + ", ".join(notFound)
        error = {"message": errorMsg, "data": notFound}
    
    responseArray = []
    for companies in res.keys():
        for index , filing in enumerate(res[companies]):
            metrics = KeyMetric.objects.filter(company=filing['company_id'])
            res[companies][index]['key_metrics'] = metrics.values()
            # print("Response:", res[companies][index])
            responseArray.append(res[companies][index])        


    return Response({"error": error, "data": responseArray}, status=status.HTTP_200_OK)

@api_view(["POST"])
def companyMetric(request):
    tickers = request.data.get("tickers")

    responseArray = []
    for ticker in tickers:
        metrics = KeyMetric.objects.filter(company=ticker)
        companies = Company.objects.filter(ticker=ticker)
        metrics_list=[]
        print("Metrics:", companies.values()[0])
        company = companies.values()[0]
        for i in metrics.values():
            metrics_list.append(i)

        company['key_metrics'] = metrics_list
        responseArray.append(company)

        # responseArray = []
        # for company in companies.values():
        #     res = company
        #     print("Company:", company)
        #     res['key_metrics'] = metrics.values()
        #     responseArray.append(res)

    print("Metric List:", responseArray)
    return Response( {"error":None,"data": responseArray}, status=status.HTTP_200_OK)

@api_view(["POST"])
def advancedSearch(request):
    """API endpoint for the search bar

    Args: \n
        query (string): A string containing details like ticker, date, form type

    Returns: \n
        companies list[object]: details of all the companies provided \n
        filings list[object]: details of all the fillings provided
    """

    query = request.data.get("query")
    words = query.split(" ")
    words = [word.upper() for word in words if word != ""]

    if not query or not words:
        return Response(
            {"error": {"message": "No Query Found"}}, status=status.HTTP_404_NOT_FOUND
        )

    companies = Company.objects.all()
    all_tickers = [company.ticker for company in companies]

    searched_tickers = [ticker for ticker in all_tickers if ticker in words]
    searched_form_types = [
        form_type for form_type in ["10K", "10Q", "8K"] if form_type in words
    ]
    searched_dates = re.findall(r"\d{4}-\d{2}-\d{2}", query)
    searched_YQs = re.findall(r"\d{4}Q{1}\d", query)
    searched_years = re.findall(r"\d{4}", query)
    searched_years = [year for year in searched_years if year in words]

    searched_companies = Company.objects.filter(ticker__in=searched_tickers)

    if len(searched_companies) == 0:
        return Response(
            {"error": {"message": "No Company Found"}}, status=status.HTTP_404_NOT_FOUND
        )

    if len(searched_form_types) == 0:
        searched_form_types = ["10K", "10Q", "8K"]

    """
        Currently, we are not appending the results if more than one of the below type is provided
        Priority on dates is given in the following order:
            1. yyyyQq
            2. YYYY-MM-DD
            3. YYYY
    """
    if len(searched_YQs) != 0:
        # if YQs are provided, then I am giving them complete priority over any other date filters
        queryset = Filing.objects.annotate(
            YQ=ExpressionWrapper(
                Concat(F("year"), Value("Q"), F("quarter")), output_field=TextField()
            )
        ).filter(
            YQ__in=searched_YQs,
            company__in=searched_companies,
            form_type__in=searched_form_types, isDummy=False
        )

        return Response(
            {
                "error": None,
                "type": "searched_YQs",
                "data": {
                    "companies": searched_companies.values(),
                    "filings": queryset.values(),
                },
            },
            status=status.HTTP_200_OK,
        )

    if len(searched_dates) != 0:
        queryset = Filing.objects.filter(
            company__in=searched_companies,
            form_type__in=searched_form_types,
            date__in=searched_dates, isDummy=False
        )
        return Response(
            {
                "error": None,
                "type": "searched_dates",
                "data": {
                    "companies": searched_companies.values(),
                    "filings": queryset.values(),
                },
            },
            status=status.HTTP_200_OK,
        )

    if len(searched_years) != 0:
        queryset = Filing.objects.filter(
            company__in=searched_companies,
            form_type__in=searched_form_types,
            year__in=searched_years, isDummy=False
        )
        return Response(
            {
                "error": None,
                "type": "searched_years",
                "data": {
                    "companies": searched_companies.values(),
                    "filings": queryset.values(),
                },
            },
            status=status.HTTP_200_OK,
        )

    filings = Filing.objects.filter(
        company__in=searched_companies, form_type__in=searched_form_types, isDummy=False
    )

    if not filings:
        return Response(
            {"error": {"message": "No Filing Found"}}, status=status.HTTP_404_NOT_FOUND
        )

    return Response(
        {
            "error": None,
            "type": "without date",
            "data": {
                "companies": searched_companies.values(),
                "filings": filings.values(),
            },
        },
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
def simpleSearch(request):
    """API endpoint for simple search

    Args: \n
        query (string): A string containing ticker or company name
        num_of_companies (int): Number of companies to be returned - default is 5
        with_filings (bool): Whether to return the filings or not - defaults is False

    Returns: \n
        if type=='searched_tickers_with_filings': 
            companies list[object]: details of all the companies provided
            filings list[object]: details of all the fillings provided
        
        if type=='searched_tickers': 
            companies list[object]: details of all the companies provided
        
        if type=='searched_name_with_filings': 
            companies list[object]: details of all the companies provided with filings
        
        if type=='seached_name': 
            companies list[object]: details of all the companies provided without filings
    """

    query = request.data.get("query")
    withFilings = request.data.get("with_filings") or False
    num_of_companies = request.data.get("num_of_companies") or 5
    words = query.split(" ")
    words = [word.upper() for word in words if word != ""]

    if not query or not words:
        return Response(
            {"error": {"message": "No Query Found"}}, status=status.HTTP_404_NOT_FOUND
        )

    companies = Company.objects.all()
    all_tickers = [company.ticker for company in companies]

    searched_tickers = [ticker for ticker in all_tickers if ticker in words]
    searched_companies = Company.objects.filter(ticker__in=searched_tickers)


    if len(searched_companies) != 0:
        data = {
            "companies": searched_companies.values(),
        }
        type = "searched_tickers"
        if(withFilings):
            filings = Filing.objects.filter(company__in=searched_companies, isDummy=False)
            data["filings"] = filings.values()
            type = "searched_tickers_with_filings"
        
        return Response(
            {
                "error": None,
                "type": type,
                "data": data
            },
            status=status.HTTP_200_OK,
        )

    else:
        ranked_companies = {}

        # calculate the similarity of the company name with words provided
        for company in companies:
            score = fuzz.WRatio(company.name, query)
            ranked_companies[company.ticker] = score
        
        # sort the ranked_companies based on the similarity score
        ranked_companies = dict(sorted(ranked_companies.items(), key=lambda item: item[1], reverse=True))

        top_ranked = []
        for key in ranked_companies.keys():
            top_ranked.append(key)
            if len(top_ranked) == num_of_companies: 
                break
        
        searched_companies = [company for company in companies.values() if company['ticker'] in top_ranked]
        type = "searched_name"
        if(withFilings):
            type = "searched_name_with_filings"
            res_companies = [{
                "ticker": company['ticker'],
                "name": company['name'],
                "logo": company['logo'],
                "score": ranked_companies[company['ticker']],
                "filing": Filing.objects.filter(company=company["ticker"], isDummy=False).values()
            } for company in companies.values() if company['ticker'] in top_ranked]
        else:
            res_companies = [{
                "ticker": company['ticker'],
                "name": company['name'],
                "logo": company['logo'],
                "score": ranked_companies[company['ticker']],
            } for company in companies.values() if company['ticker'] in top_ranked]
        

        if(len(res_companies) != 0):
            return Response(
            {
                "error": None,
                "type": type,
                "data": {
                    "companies": res_companies,
                },
            },
            status=status.HTTP_200_OK,
            )


    return Response(
            {"error": {"message": "No Company Found"}}, status=status.HTTP_404_NOT_FOUND
        )