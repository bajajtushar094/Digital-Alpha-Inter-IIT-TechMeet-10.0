import pandas as pd
import numpy as np
from os.path import isfile, join
from os import listdir
from core.models import KeyMetric
from core.models import Company
import csv
import os
from datetime import date
import sys

rootPath = os.getcwd()
filespath = os.path.join(rootPath, 'files/')

fileName = 'saare_metrics_v4.csv'


print(filespath + fileName)
df = pd.read_csv(filespath + fileName)



metrics_type = ['Total Revenue', 'Number of Customers', 'MRR', 'ARR', 'ARPU', 'MRR Expansion', 'Number of qualified leads', 'Penetration Rate', 'Sales and Marketing', 'CAC', 'CAC payback', 'Gross Margin', 'CAC payback period', 'ASP', 'Total Assets', 'Total Liabilities Net Minority Interest', 'Debt Ratio', 'Total Equity Gross Minority Interest', 'Total Debt','Common Stock Equity',	'Total Capitalization',	'Shareholder Equity','Private Shareholding','Public Shareholding']

metrics_unit = ['Thousand USD', 'Number','Thousand USD','Thousand USD','Thousand USD','Ratio','Ratio','Ratio','Thousand USD','Thousand USD','Ratio','Percent','Number','Number','Thousand USD','Thousand USD','Ratio','Thousand USD','Thousand USD','Thousand USD','Thousand USD','Thousand USD','Ratio','Ratio']

print(len(metrics_type))
assert(len(metrics_type)==len(metrics_type))

meta = ['cik', 'date', 'quater_year', 'url', 'year_month', 'quater_year_string']

arr = []

def getDate(x):
    y = x.split('-')
    try:
        return date(int(y[0]), int(y[1]), 1);
    except Exception as e:
        return None

def getyearquarter(x):
    y = x.split(',')
    if(y[0][0]=='Q'):
        return int(y[1]), int(y[0][1])
    return None, None
c = 0
def func(row, metric_type, metric_unit):
    global c, arr
    company = Company.objects.get(cik=row['cik'])
    dd = getDate(row['year_month'])
    # print(row['year_month'], dd)
    if dd and (not isinstance(row[metric_type],str)) and (not np.isnan(row[metric_type])) and abs(row[metric_type])!=np.inf and row[metric_type]!='' and row[metric_type]!='inf' :
        
        year, quarter = getyearquarter(row['quater_year_string'])
        # try:
        #     # KeyMetric.objects.create(company=company, date=getDate(row['year_month']), source=row['url'], metric_type=metric_type, metric_unit=metric_unit, metric_value=row[metric_type], year=year, quarter=quarter)
        #     c += 1
        #     # if row[metric_type] == "nan":
        #     #     print("FFFFFFFFFFFFFFFFFFFFFFf")
        #     #     print(metric_type, row['cik'])
        #     #     sys.exit()
        #     if c%100==0:
        #         print(c)
        # except:
        #     pass
        if c <=340000:
            arr.append(KeyMetric(company=company, date=getDate(row['year_month']), source=row['url'], metric_type=metric_type, metric_unit=metric_unit, metric_value=row[metric_type], year=year, quarter=quarter))
        else:
            try:
                KeyMetric.objects.create(company=company, date=getDate(row['year_month']), source=row['url'], metric_type=metric_type, metric_unit=metric_unit, metric_value=row[metric_type], year=year, quarter=quarter)
            except Exception as e:
                print(row)
                print(e)
        try:
            if len(arr) >= 100:
                KeyMetric.objects.bulk_create(arr)
                arr = []
                c += 1
                print(c)
                print("done")
        except Exception as e:
            c += 1
            arr = []
            print(row)
            print(arr)
            print(e)
            pass
            
    else:
        pass





for (metric_type, metric_unit) in zip(metrics_type, metrics_unit):
    cols = meta + [metric_type]
    df[cols].apply(lambda row: func(row, metric_type, metric_unit), axis=1)
    # print(arr)
    # sys.exit()


KeyMetric.objects.bulk_create(arr)