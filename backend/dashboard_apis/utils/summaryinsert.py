from core.models import *
import pandas as pd
import numpy as np
import os
import sys

rootPath = os.getcwd()
filespath = os.path.join(rootPath, 'files/')

fileName = 'sentiment_metadata.csv'

arr = []
c=0
def func(row):
    global c
    if not Filing.objects.filter(filelink=row['Filing'].split('.')[0]).exists():
        c += 1
        return
    filing = Filing.objects.get(filelink=row['Filing'].split('.')[0])
    arr.append(Summary(filing=filing, text=row['text'], section_heading=row['Section heading'], polarity_score=row['Polarity score'], sentiment_label=row['sentiment label']))

# print(filespath + fileName)
df = pd.read_csv(filespath + fileName)
df.apply(lambda row: func(row), axis=1)


print(c)
Summary.objects.bulk_create(arr)