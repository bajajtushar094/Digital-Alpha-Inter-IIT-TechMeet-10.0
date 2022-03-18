from os.path import isfile, join
from os import listdir
from backend.dashboard_apis.core.models import KeyMetric
from core.models import Company
import csv

rootPath = 'C:\\Users\\Aman\\Documents\\GitHub\\Digital-Alpha-Inter-IIT-TechMeet-10.0\\backend\\csv_data\\metrics\\'

onlyfiles = [f for f in listdir(rootPath) if isfile(join(rootPath, f))]
print(onlyfiles)

typeToUnit = {
    'Revenue': 'K',
}

for fileName in onlyfiles:
    file = open(rootPath + fileName)
    csvreader = csv.reader(file)
    headers = next(csvreader)
    rows = []
    for row in csvreader:
        # data is provided in cik ,date ,{metric names ... variable length}, source
        company = Company.objects.get(cik=row[0])
        for i in range(2, len(row) - 1):
            metric_type = headers[i]
            metric_value = row[i]
            date = row[1]
            rows.push([company, date , metric_type, metric_value, row[-1]])

    file.close()        
    
    KeyMetric.objects.bulk_create([
        KeyMetric(company=row[0], date=row[1], metric_type=row[2], metric_value=row[3], metric_unit =typeToUnit[row[2]],  source=row[4]) for row in rows
    ])