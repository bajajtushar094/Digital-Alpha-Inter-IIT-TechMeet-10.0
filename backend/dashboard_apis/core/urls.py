from django.urls import path, include
from .companies_views import *
from .search_views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("companies/bookmark/<str:ticker>", bookmarkCompanyView.as_view()),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('search/companies', searchCompanies,),
]