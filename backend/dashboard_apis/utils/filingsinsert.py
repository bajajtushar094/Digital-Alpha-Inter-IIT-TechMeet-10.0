from core.models import *
import pandas as pd
import numpy as np
import os


rootPath = os.getcwd()
filespath = os.path.join(rootPath, 'files/')

fileName = 'filings_metadata (3).csv'

arr = []
c = 0
def func(row):
    global c
    if not Company.objects.filter(cik=row[' CIK']).exists():
        c += 1
        return
    company = Company.objects.get(cik=row[' CIK'])
    arr.append(Filing(company=company, form_type=row[' Filing form type'], year=int(row[' Year']), quarter=int(row[' Quarter'][1]), date=row[' Filing date'], filelink=row[' Filelink'].split('.')[0]))


# print(filespath + fileName)
df = pd.read_csv(filespath + fileName)
df.apply(lambda row: func(row), axis=1)

print(c)


Filing.objects.bulk_create(arr)



