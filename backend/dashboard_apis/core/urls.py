from django.urls import path, include
from .companies_views import *

urlpatterns = [
    path("companies/bookmark/<str:ticker>", bookmarkCompanyView.as_view())
]