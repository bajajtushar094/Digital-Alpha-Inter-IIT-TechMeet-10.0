from core.models import *
from datetime import datetime
# company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='key_metrics')
# filing = models.ForeignKey(Filing, on_delete=models.CASCADE, related_name='key_metrics')	# Filing for drilldown
# # source = models.CharField(max_length=8, choices=SOURCE_TYPES)
# # 
# date = models.DateField()
# yearly = models.BooleanField(_('Yearly or quaterly'), default=False)
# drilldown_offset = models.IntegerField()								# Drilldown Highlight offset
# drilldown_length = models.IntegerField()								# Drilldown Highlight length
# metric_type = models.CharField(max_length=32, choices=METRIC_TYPES)
# metric_value = models.DecimalField(max_digits=8, decimal_places=2)		# 53.53, 10.00
# metric_unit = models.CharField(max_length=5, choices=METRIC_UNITS)
filing = Filing.objects.get(id=3)

companies = ['GOOG', 'AAPL', 'MAI']
vals = [0.5, 0.65, 0.34, 0.76]
dates = ['2019-03-01', '2019-06-01', '2019-09-01', '2019-12-01']

for company in companies:
    comp = Company.objects.get(ticker=company)
    for (val, date) in zip(vals, dates):
        KeyMetric.objects.create(company=comp, filing=filing, date=date, yearly=False, drilldown_offset=1, drilldown_length=1, metric_type='ARR', metric_value=val, metric_unit='B')
        KeyMetric.objects.create(company=comp, filing=filing, date=date, yearly=False, drilldown_offset=1, drilldown_length=1, metric_type='CCR', metric_value=val, metric_unit='%')

