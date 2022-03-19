from .models import *
from rest_framework.response import Response
from rest_framework import status
import csv
from django.http import HttpResponse
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

def csvResponse(queryset, headerfieldnames, dictfieldnames, dic=False):
    response = HttpResponse (content_type='text/csv')
    writer = csv.writer(response)
    writer.writerow(headerfieldnames)
    if dic:
        qs = queryset
    else:
        qs = queryset.values()
    arr = []
    for q in qs:
        arr.append([q[fieldname] for fieldname in dictfieldnames])
    writer.writerows(arr)
    
    return response