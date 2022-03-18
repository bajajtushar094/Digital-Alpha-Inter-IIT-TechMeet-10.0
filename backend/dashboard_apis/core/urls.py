from django.urls import path

from .basket_views import *
from .companies_views import *
from .search_views import *
from .landing_views import *
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
    path('search/advanced', advancedSearch,),
    path('search', simpleSearch,),

    #Company APIs
    path("companies/bookmark/<str:ticker>", bookmarkCompanyView.as_view()),
    path("companies/recentFilings/<str:ticker>", getRecentFilings.as_view()),
    path("companies/addToBasket/<str:ticker>",addToBasket.as_view()),
    path("companies/addRecentlyViewedCompany/<str:ticker>",addRecentlyViewedCompany.as_view()),

    #Landing page Apis
    path("landingPage/recentFilings/all", getAllRecentFilings.as_view()),
    path("landingPage/companies/all", getAllCompanies.as_view()),
    path("landingPage/baskets/<int:user_id>", getAllBaskets.as_view()),
    path("landingPage/bookmarkedCompanies/<int:user_id>",bookmarkedCompanies.as_view()),
    path("landingPage/recentlyViewedCompanies",recentlyViewedCompanies.as_view()),
    path("landingPage/recentlyFiled",recentlyFiled.as_view()),


    path('companies/getKeyMetrics/<str:ticker>/<str:metric_type>', getKeyMetrics.as_view()),
    path('companies/getFilingMetric/<int:id>', getFilingFromMetric.as_view()),

    #Filing APIs
    path("filings/getKeyMetric/<int:id>/<str:metric_type>", getKeyMetricsOfFiling.as_view()),
    path("filings/getMetricsFromFilings/<int:id>", getMetricsFromFiling.as_view()),

    #Basket APIs
    # I think these are wrong APIs, makes no sense to me :(
    path("basket/bookmarked", getBookmarks,),
    path('basket/filings', getBookmarksWithFilings),
    path('basket/compare', getComparisonData),

    # these are the correct ones :)
    path("basket/get", getBaskets), 
    path("basket/details", getBasketDetails),
    path("basket/create", createBasket),
    path("basket/update", updateBasketName),
    path("basket/delete", deleteBasket),

    # add to db
    path("addtodb", addToDb)

]