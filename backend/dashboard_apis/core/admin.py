from django.contrib import admin
from .models import Basket, Company, KeyMetric, Filing, User, RecentlyViewed

admin.site.register(User)
admin.site.register(Filing)
admin.site.register(KeyMetric)
admin.site.register(Company)
admin.site.register(Basket)
admin.site.register(RecentlyViewed)
