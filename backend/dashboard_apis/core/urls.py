from django.urls import path, include
from .companies_views import *
from .search_views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .fillings_view import *

urlpatterns = [
    #Auth APIs
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Search APIs
    path('search/companies', searchCompanies,),
    path('search/filings', searchFillings,),
    path('search', completeSearch,),

    #Company APIs
    path("companies/bookmark/<str:ticker>", bookmarkCompanyView.as_view()),
    path("companies/recentFilings/<str:ticker>", getRecentFilings.as_view()),
    path("companies/addToBasket/<str:ticker>",addToBasket.as_view()),
    path('companies/getKeyMetrics/<str:ticker>/<str:metric_type>', getKeyMetrics.as_view()),
    path('companies/getFilingMetric/<int:id>', getFilingFromMetric.as_view()),

    #Filing APIs
    path("filings/getKeyMetric/<int:id>/<str:metric_type>", getKeyMetricsOfFiling.as_view())

]