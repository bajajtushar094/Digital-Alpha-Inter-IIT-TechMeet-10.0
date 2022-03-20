# -*- coding: utf-8 -*-
"""extracting_quarterly_data_from_outside_source.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1IQjU8rFqeWoN549UYj3OA2enmKykE9Ek
"""

import os
import json

import pandas as pd

df = pd.DataFrame()
  
print(df)

directory = "quarter_button"

ciks = []
dates = []
total_revenue = []
cost_of_revenue = []
gross_profit = []
gross_margin = []
filenames = []

for filename in os.listdir(directory):
    ff = os.path.join(directory, filename)
    # checking if it is a file
    if os.path.isfile(ff):
        f = open(str(ff),"r")
        strr = filename
        l = len(strr)
        stra = strr[:l-4]
        type = stra[-1]
        print(type)
        cik = stra[:len(stra)-2]
        print(cik)
        print(filename)
        df1 = pd.read_csv(str(ff))
        # df1.replace({'-': '0'}, regex=True)
        for col in range(len(df1.columns)):
            for row in range(len(df1)):
                if df1.iloc[row][col]=='-':
                    df1.iloc[row][col] = '0'
        # df1.drop("Unnamed: 0", axis = 1)
        # df1.drop(df.columns[[0,1]], axis = 1, inplace = True)
        if type == '0':
            for j in range(2,len(df1.columns)):
                date = df1.columns[j]
                dates.append(date)
                total_revenue.append(df1.iloc[0][j])
                cost_of_revenue.append(df1.iloc[1][j])
                gross_profit.append(df1.iloc[2][j])
                gm=0
                if df1.iloc[0][j]!='-' and df1.iloc[1][j]!='-' and df1.iloc[2][j]!='-' and float(df1.iloc[0][j])!=0.0:
                    gm = (float(df1.iloc[0][j])-float(df1.iloc[1][j]))/(float(df1.iloc[0][j]))
                gross_margin.append(gm)
                ciks.append(cik)
                filenames.append(filename)

df = pd.DataFrame()

df['cik'] = ciks
df['date'] = dates
df['total revenue'] = total_revenue
df['cost of revenue'] = cost_of_revenue
df['gross_profit'] = gross_profit
df['gross_margin'] = gross_margin
df['filenames'] = filenames





directory = "quarter_button"


mets = ['Total Revenue','Operating Revenue','Cost of Revenue','Gross Profit','Operating Expense','Selling General and Administrative','Operating Income'
,'Selling & Marketing Expense']

# mets = ['Selling General and Administrative','Operating Income'
# ,'Selling & Marketing Expense']


for metric in mets:
    ciks = []
    dates = []
    filenames = []
    vals = []
    df = pd.DataFrame()
    for filename in os.listdir(directory):
        ff = os.path.join(directory, filename)
        # checking if it is a file
        if os.path.isfile(ff):
            f = open(str(ff),"r")
            strr = filename
            l = len(strr)
            stra = strr[:l-4]
            type = stra[-1]
            print(type)
            cik = stra[:len(stra)-2]
            print(cik)
            print(filename)
            df1 = pd.read_csv(str(ff))
            if type == '0':
                for j in range(len(list(df1['Breakdown']))):
                    if list(df1['Breakdown'])[j] == metric:
                        for kk in range(2,len(df1.columns)):
                            date = df1.columns[kk]
                            dates.append(date)
                            vals.append(df1.iloc[j][kk])
                            ciks.append(cik)
                            filenames.append(filename)

    df['cik'] = ciks
    df['date'] = dates
    df[str(metric)] = vals
    df['filenames'] = filenames
    csvname = 'data_for_dev_team/quarterly/' + str(metric) + '.csv'
    df.to_csv(csvname)

import collections
counter=collections.Counter(list_of_mets)
print(dict(counter))
