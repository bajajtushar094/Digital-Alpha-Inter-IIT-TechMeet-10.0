from core.models import Company
import csv

file = open('/home/ankit/Projects/Inter IIT/SaaS 2022/Digital-Alpha-Inter-IIT-TechMeet-10.0/backend/dashboard_apis/core/files/total_revenue_costofrevenue_grossprofit_grossmargin.csv')
print('ok')
csvreader = csv.reader(file)
headers = next(csvreader)
rows = []
for row in csvreader:
    rows.append(row)
print(rows)
# for row in rows:
#     if(len(KeyMetric.objects.filter(name=row[2]))==0):
#         KeyMetric(cik=row[1],ticker=row[0],name=row[2],logo='images/').save()


file.close()