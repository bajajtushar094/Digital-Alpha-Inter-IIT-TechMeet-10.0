from django.contrib import admin
from .models import Basket, Company, KeyMetric, Filing, User

admin.site.register(User)
admin.site.register(Filing)
admin.site.register(KeyMetric)
admin.site.register(Company)
admin.site.register(Basket)
