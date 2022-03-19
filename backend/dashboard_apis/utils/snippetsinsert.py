from core.models import *
import pandas as pd
import numpy as np
import os
import sys

rootPath = os.getcwd()
filespath = os.path.join(rootPath, 'files/')

fileName = 'FINAL_QNA_ON_SUMMARY_ALL_191_v2 (1).csv'


arr = []
c = 0
def func(row):
    global c
    if not Filing.objects.filter(filelink=row['filename'].split('.')[0]).exists():
        c += 1
        return
    filing = Filing.objects.get(filelink=row['filename'].split('.')[0])
    for (question, context) in zip(questions, contexts):
        confidence = row[question].split(',')[0]
        answer = ','.join(row[question].split(',')[1:])
        arr.append(Snippet(filing=filing, question=question, answer=answer, context=row[context], confidence_score=confidence))

# print(c)

# print(filespath + fileName)
df = pd.read_csv(filespath + fileName)

cols = df.columns
questions = cols[2::2]
contexts = cols[3::2]

print(len(questions))
assert(len(questions)==len(contexts))
sys.exit()

df.apply(lambda row: func(row), axis=1)



Snippet.objects.bulk_create(arr)