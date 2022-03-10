import imp
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models.functions import Concat
from django.db.models import Value, TextField, F, ExpressionWrapper
from .models import *
from datetime import *
import re


@api_view(["POST"])
def searchCompanies(request):
    """API endpoint for searching companies

    Args: \n
        tickers (list[string]): Unique ids to identify the company

    Returns: \n
        company_details list[object]: details of all the companies provided
    """

    tickers = request.data.get("tickers")

    if not tickers:
        return Response(
            {"error": {"message": "No Ticker Found"}}, status=status.HTTP_404_NOT_FOUND
        )

    companies = Company.objects.filter(ticker__in=tickers)

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
        {"error": error, "data": companies.values()}, status=status.HTTP_200_OK
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

    return Response({"error": error, "data": res}, status=status.HTTP_200_OK)


@api_view(["POST"])
def completeSearch(request):
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
            form_type__in=searched_form_types,
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
            date__in=searched_dates,
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
            year__in=searched_years,
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
        company__in=searched_companies, form_type__in=searched_form_types
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
