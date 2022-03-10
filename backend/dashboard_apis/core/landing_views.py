import imp
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import *
import json
from .serializers import *

class getAllRecentFilings(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):

        try:
            filings = Filing.objects.all().order_by('date')
        except:
            return Response(
                {"res":"Error while fetching filings of the company"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(
            data=FilingSerializer(query_set=filings).data,
            status=status.HTTP_200_OK
        )

