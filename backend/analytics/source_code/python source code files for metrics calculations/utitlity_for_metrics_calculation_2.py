# -*- coding: utf-8 -*-
"""utitlity_for_metrics_calculation_2.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1RSO9nsH1-jnpdCI6_4maHv8jS8qe-KJB
"""

import pandas as pd
import math
import numpy as np

df = pd.read_csv(r"no_of_customers.csv")

df.head()

dict = {}
for i in range(len(df)):
    dict[df.cik[i]] = df['No of customers'][i]

print(len(dict))

df2 = pd.read_csv(r"data_for_dev_team/annual/Total Revenue.csv")

df2.head()

for i in range(len(df2)):
    if df2[i][3] == '-':
        df2[i][3] = 0.0

"""CAC(Customer Acquisition Cost) : CAC , GM%(Gross Margin Percentage) : Gross Margin, MRR(Monthly Recurring Revenue): MRR, ARPU(Average Revenue Per User): ARPU, AU(Active Users):Number of customers"""

dict[1001601]

arr = []
i = 0
while i<len(df2):
    cik = df2['cik'][i]
    while i<len(df2) and cik not in dict:
        arr.append(-1)
        i+=1
    arr.append(dict[cik])
    temp = float(df2['Total Revenue'][i])/4
    i+=1
    while i<len(df2) and cik==df2['cik'][i]:
        if float(temp) == 0 :
            arr.append(0)
        else:
            arr.append((float(df2['Total Revenue'][i])/float(temp))*float(arr[-1]))
        temp = df2['Total Revenue'][i]
        i+=1

print(arr)

arr = pd.Series(arr,name = 'Number of customers')
df2 = pd.concat([df2,arr],axis = 1)

df2.head(50)

for i in range(len(df2)):
    if df2['Number of customers'][i]<=0 or math.isnan(df2['Number of customers'][i]):
        df2['Number of customers'][i] = -1

df2.head(50)

type(df2.date[0])

dict2 = {'2022': 0.02531573131, '2021': 0.02822093478, '2020': 0.03238155,'ttm' :0.02531573131 ,'2019':0.03553226771,"2018":0.03868298543}

for i in range(len(df2)):
    if df2['Number of customers'][i]==-1:
        x = df2['date'][i][-4::]
        df2['Number of customers'][i] = int(dict2[x]*df2['Total Revenue'][i]*1000)
    else:
        df2['Number of customers'][i] = int(df2['Number of customers'][i])

df2

df2.to_csv('Most important table.csv')

df2['MRR'] = df2['Total Revenue']/12

df2['ARR'] = df2['MRR']*12

df2['ARPU'] = df2['ARR']/df2['Number of customers']

df2.to_csv(r'first 4 metrics.csv')

temp = []
for i in range(len(df2)-1):
    if df2.cik[i]==df2.cik[i+1]:
        val = (float(df2['Number of customers'][i+1]) - df2['Number of customers'][i])/df2['Number of customers'][i+1]
        temp.append(val)
    else:
        temp.append(np.nan)
temp.append(np.nan)

print(temp)

temp = pd.Series(temp,name = 'Churn')
df2 = pd.concat([df2,temp],axis = 1)

df2

df2['CRR'] = 1 - df2['Churn']



temp = []
for i in range(len(df2)-1):
    if df2.cik[i]==df2.cik[i+1]:
        val = -(float(df2['MRR'][i+1]) - df2['MRR'][i])/df2['MRR'][i+1]
        temp.append(val)
    else:
        temp.append(np.nan)
temp.append(np.nan)

temp = pd.Series(temp,name = 'MRR Expansion')
df2 = pd.concat([df2,temp],axis = 1)

dict3 = {'2022': 171.9*(10**9), '2021': 145.509*(10**9),'2020': 120.686*(10**9),'2019': 101.913*(10**9),'2018':83.517*(10**9), 'ttm' : 171.9*(10**9)}

temp3 = []
for i in range(len(df2)):
    x = df2['date'][i][-4::]
    if x in dict3:
        val = df2['Total Revenue'][i]*4000/dict3[x]
        temp3.append(val)
    else:
        temp3.append(np.nan)
print(len(temp3))

temp3 = pd.Series(temp3,name = 'Number of qualified leads')
df2 = pd.concat([df2,temp3],axis = 1)

df2

dict4 = {'2022': 1.088266*(10**9), '2021': 1.0266*(10**9),'2020': 0.977*(10**9),'2019': 0.9053*(10**9),'2018':0.8132 ,'ttm' : 1.088266*(10**9)}

temp4 = []
for i in range(len(df2)):
    x = df2['date'][i][-4::]
    if x in dict4:
        val = df2['Number of customers'][i]/dict4[x]
        temp4.append(val)
    else:
        temp4.append(np.nan)
print(len(temp4))

temp4 = pd.Series(temp4,name = 'Penetration Rate')
df2 = pd.concat([df2,temp4],axis = 1)

df2

dfsales = pd.read_csv(r"data_for_dev_team/annual/Selling & Marketing Expense.csv")

dfsales

df2.to_csv('annual_saare_metrics_v1.csv')

df3 = pd.read_csv(r"data_for_dev_team/annual/bs/Total Assets.csv")

df3

df4 = pd.read_csv(r"data_for_dev_team/annual/bs/Total Liabilities Net Minority Interest.csv")

df4

df3 = pd.concat([df3,df4['Total Liabilities Net Minority Interest']],axis=1)

df3

df2.drop(columns = ['Unnamed: 0'],inplace = True)
df3.drop(columns = ['Unnamed: 0'],inplace = True)

df3['debt ratio'] = df3['Total Liabilities Net Minority Interest'] / df3['Total Assets']

df3

df4 = pd.read_csv(r"data_for_dev_team/annual/bs/Total Equity Gross Minority Interest.csv")

df4

df3 = pd.concat([df3,df4['Total Equity Gross Minority Interest']],axis=1)

df3

df4 = pd.read_csv(r"data_for_dev_team/annual/bs/Total Debt.csv")

df4

df3 = pd.concat([df3,df4['Total Debt']],axis=1)

df3

df4 = pd.read_csv(r"data_for_dev_team/annual/bs/Common Stock Equity.csv")

df4

df3 = pd.concat([df3,df4['Common Stock Equity']],axis=1)

df3

df4 = pd.read_csv(r"data_for_dev_team/annual/bs/Total Capitalization.csv")

df4

df3 = pd.concat([df3,df4['Total Capitalization']],axis=1)

df3

df3['Shareholder Equity'] = df3['Total Assets'] - df3['Total Liabilities Net Minority Interest']

df3

df3['Private Shareholding'] = df3['Shareholder Equity']/df3['Total Capitalization']

df3['Public Shareholding'] = 1 - df3['Private Shareholding']

df3

df3.to_csv('Annual_balance_sheet_se_metrics.csv')

df2['LTV'] = df2['ARPU']/df2['Churn']

df2

df2.to_csv('metrics_from_cust_and_is.csv')

df2 = pd.read_csv('metrics_from_cust_and_is.csv')

df2

dfnew = pd.read_csv(r'first_4_metrics_with_quater_and_link2.csv')

dfnew

df2 = pd.concat([df2,dfnew['quater_year']],axis=1)
df2 = pd.concat([df2,dfnew['url']],axis=1)
df2 = pd.concat([df2,dfnew['year_month']],axis=1)

df2

dfvenky = pd.read_csv('annual_CAC Payback_Gross Margin_ CAC.csv')
# "C:\Users\Pranav\Downloads\CAC Payback_Gross Margin_ CAC.csv"

dfvenky

df2 = pd.concat([df2,dfvenky['Sales and Marketing']],axis=1)
df2 = pd.concat([df2,dfvenky['CAC']],axis=1)
df2 = pd.concat([df2,dfvenky['CAC payback']],axis=1)
df2 = pd.concat([df2,dfvenky['Gross Margin']],axis=1)

df2



df2.to_csv('saare_metrics.csv')

dffinalq = pd.read_csv('saare_metrics_v4.csv')

print(dffinalq.columns)

dffinalann = pd.read_csv('annual_combined_df.csv')
print(dffinalq.columns)

dffinalann



"""'CAC payback period', 'ASP', 'LTV : CAC ratio','CAC payback"""

dffinalann['CAC payback period'] = 12*dffinalann['CAC']/(dffinalann['Gross Margin']*dffinalann['ARPU'])

dffinalann

df1 =dffinalann
ASPs = []
for i in range(len(df1)-1):
    if df1.iloc[i][1]==df1.iloc[i+1][1]:
        val = df1.iloc[i][8] - df1.iloc[i+1][8]
        ASPs.append(val)
    else:
        ASPs.append('NaN')
ASPs.append('NaN')
df1['ASP'] = ASPs

print(df1.columns)

df1.to_csv('annual_saare_metrics_v2.csv')

df1['LTV'] = float(df1['ARPU'])/float(df1['Churn'])
df1['LTV : CAC ratio'] = float(df1['LTV'])/float(df1['CAC'])

dfgg = pd.read_csv('saare_metrics_v4.csv')

print(dfgg.columns)

CAC(Customer Acquisition Cost) : CAC , GM%(Gross Margin Percentage) : Gross Margin, MRR(Monthly Recurring Revenue): MRR, ARPU(Average Revenue Per User): ARPU, AU(Active Users):Number of customers

"""CAC(Customer Acquisition Cost) : CAC , 
GM%(Gross Margin Percentage) : Gross Margin,
 MRR(Monthly Recurring Revenue): MRR, 
 ARPU(Average Revenue Per User): ARPU, 
 AU(Active Users):Number of customers
 ARR(Monthly Recurring Revenue): ARR,
 Churn Rate: Churn,
 MRR expansion rate: MRR Expansion,
 # qualified leads : Number of qualified leads,
 % Penetration : Penetration Rate,
 Total Revenue : Total revenue
Assets : 'Total Assets',
Liabilities : 'Total Liabilities Net Minority Interest',
Debt ratio : 'debt ratio',
Total Equity: 'Total Equity Gross Minority Interest',
Total Debt   : 'Total Debt',
 Common Stock Equity:      'Common Stock Equity',
  Total Capitalization:      'Total Capitalization', 
 Shareholder Equity :      'Shareholder Equity',
 Private Shareholding:      'Private Shareholding',
 Public Shareholding  :     'Public Shareholding'
 LTV(Lifetime Value) : LTV
 CAC payback period in months : 'CAC payback period',
Average Selling Price : 'ASP',
 LTV : CAC ratio : 'LTV : CAC ratio'

"""