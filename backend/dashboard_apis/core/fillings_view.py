from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .utils import *
from .models import *
from .serializers import *

class getKeyMetricsOfFiling(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        id = kwargs['id']
        metric_type = kwargs['metric_type']
        metrics = KeyMetric.objects.filter(filing=id, metric_type=metric_type)

        return Response(
            data=metrics.values(),
            status=status.HTTP_200_OK
        )


class drilldownKeyMetric(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        id = kwargs['id']

        try:
            metric = KeyMetric.objects.get(id=id)
        except:
            return Response(
                {"res":"Error while while keymetric"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        filing_id = metric.filing

        try:
            filing= Filing.objects.filter(id=filing_id)[0]
        except:
            return Response(
                {"res":"Error while fetching filing"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        





