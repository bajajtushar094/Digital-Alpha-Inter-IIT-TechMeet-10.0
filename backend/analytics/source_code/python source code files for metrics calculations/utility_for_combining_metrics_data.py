# -*- coding: utf-8 -*-
"""utility_for_combining_metrics_data.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1kWmN8-hVT-pwNQpkso2-_y3ttbxM0tiL
"""

import pandas as pd
import json

sales_and_marketing = pd.read_csv('data_for_dev_team/annual/Selling & Marketing Expense.csv')
sales_and_marketing

customers = pd.read_csv('annual_saare_metrics_v1.csv')
customers.head(20)

customer_dict = {}

for i in range(0, len(customers)):
    if customers['cik'][i] in customer_dict.keys():
        customer_dict[customers['cik'][i]]+=1

    else:
        customer_dict[customers['cik'][i]]=1

customer_dict

sales_dict={}

for i in range(0, len(sales_and_marketing)):
    if sales_and_marketing['cik'][i] in sales_dict.keys():
        sales_dict[sales_and_marketing['cik'][i]]+=1

    else:
        sales_dict[sales_and_marketing['cik'][i]]=1

sales_dict

matches = 0

for i in customer_dict.keys():
    for j in sales_dict.keys():
        if i==j and customer_dict[i] == sales_dict[j]:
            matches+=1

if matches == len(sales_dict):
    print('yes')

not_found_cik = []

for i in customer_dict.keys():
    if i not in sales_dict.keys():
        not_found_cik.append(i)

print(not_found_cik)

j=0
customers['Sales and Marketing'] = [None]*len(customers)

for i in range(0, len(customers)):
    if customers['cik'][i] == sales_and_marketing['cik'][j]:
        customers['Sales and Marketing'][i] = sales_and_marketing['Selling & Marketing Expense'][j]
        j+=1

    else:
        customers['Sales and Marketing'][i] = 0

customers.head(11)

len(customers)

customers['customers difference'] = [None]*len(customers)

for i in range(0, len(customers)):

    if customers['date'][i] == 'ttm':
        customers['customers difference'][i] = 0

    elif i!=len(customers)-1 and customers['cik'][i] == customers['cik'][i+1]:
        customers['customers difference'][i] = customers['Number of customers'][i] - customers['Number of customers'][i+1]

    elif i!=len(customers)-1 and customers['cik'][i] != customers['cik'][i+1]:
        customers['customers difference'][i] = 0

    else:
        customers['customers difference'][i] = 0

customers

customers.tail(10)

import numpy as np

customers['CAC'] = [None]*len(customers)

for i in range(len(customers)):
    if customers['customers difference'][i] == 0:
        customers['CAC'][i] = np.nan

    else:
        customers['CAC'][i] = float(customers['Sales and Marketing'][i])/float(customers['customers difference'][i])

customers.head(10)

customers.head(20)

customers.to_csv('annual_CAC.csv')

gross_margin = pd.read_csv('annual_gross_margin2.csv')
len(gross_margin)

gross_margin.head(20)

customers['CAC payback'] = customers['CAC']/gross_margin['Gross Margin (in percent)']
list_cac_payb = []
for i in range(len(customers)):
    if list(gross_margin['Gross Margin (in percent)'])[i]==0 : 
        list_cac_payb.append(np.nan)
    else:
        list_cac_payb.append(list(customers['CAC'])[i]/list(gross_margin['Gross Margin (in percent)'])[i])

customers['CAC payback'] = list_cac_payb

customers['Gross Margin'] = gross_margin['Gross Margin (in percent)']
customers.head(20)

customers.to_csv('annual_CAC Payback_Gross Margin_ CAC.csv')





sales_and_marketing

print(len(sales_dict))

customers2 = customers[customers['date']!='ttm']
customers2

customers2.reset_index(inplace=True, drop=True)

customers2

customers2['customers difference'] = [None]*len(customers2)

for i in range(0, len(customers2)):
    if i!=len(customers2)-1 and customers2['cik'][i] == customers2['cik'][i+1]:
        customers2['customers difference'][i] = customers2['Number of customers'][i] - customers2['Number of customers'][i+1]

    elif i!=len(customers2)-1 and customers2['cik'][i] != customers2['cik'][i+1]:
        customers2['customers difference'][i] = 0

    else:
        customers2['customers difference'][i] = 0

print(customers2)

not_found_cik = []

for i in revenue_dict.keys():
    if i not in cost_of_revenue_dict.keys():
        not_found_cik.append(i)

print(not_found_cik)











# customers_subData = customers[customers['cik'] == sales_and_marketing['cik']]
# customers_subData

sales_and_marketing['CAC'] = [None]*len(sales_and_marketing)

j=0

for i in range(0, len(customers)):
    if customers['cik'][i] == sales_and_marketing['cik'][j]:
        
        if customers['Number of customers'][i]!=0:
            try:
                
                sales_and_marketing['CAC'][j] = float(sales_and_marketing['Selling & Marketing Expense'][j])/float(customers['Number of customers'][i])

            except:
                sales_and_marketing['CAC'][j] = 0
                print(sales_and_marketing['Selling & Marketing Expense'][j])
                print(customers['Number of customers'][i])

        else:
            pass
        j+=1

sales_and_marketing.head(10)

sales_and_marketing.isna().sum()

sales_and_marketing.fillna(0, inplace=True)
sales_and_marketing.isna().sum()

sales_and_marketing.head(13)

revenue = pd.read_csv('data_for_dev_team/annual/Total Revenue.csv')
revenue

cost_revenue = pd.read_csv('data_for_dev_team/annual/Cost of Revenue.csv')
cost_revenue

revenue_dict = {}

for i in range(0, len(revenue)):
    if revenue['cik'][i] in revenue_dict.keys():
        revenue_dict[revenue['cik'][i]]+=1

    else:
        revenue_dict[revenue['cik'][i]]=1

revenue_dict

cost_of_revenue_dict = {}

for i in range(0, len(cost_revenue)):
    if cost_revenue['cik'][i] in cost_of_revenue_dict.keys():
        cost_of_revenue_dict[cost_revenue['cik'][i]]+=1

    else:
        cost_of_revenue_dict[cost_revenue['cik'][i]]=1

cost_of_revenue_dict

matches = 0

for i in revenue_dict.keys():
    for j in cost_of_revenue_dict.keys():
        if i==j and revenue_dict[i] == cost_of_revenue_dict[j]:
            matches+=1

if matches == len(cost_of_revenue_dict):
    print('yes')

not_found_cik = []

for i in revenue_dict.keys():
    if i not in cost_of_revenue_dict.keys():
        not_found_cik.append(i)

print(not_found_cik)

revenue.drop(['Unnamed: 0'], inplace=True, axis=1)

revenue

cost_revenue.drop(['Unnamed: 0'], axis=1, inplace=True)

cost_revenue

j=0
cost_revenue['difference'] = [None]*len(cost_revenue)
cost_revenue['revenue'] = [None]*len(cost_revenue)

for i in range(0, len(revenue)):
    if revenue['cik'][i] == cost_revenue['cik'][j]:
        try:
            cost_revenue['difference'][j] = float(revenue['Total Revenue'][i]) - float(cost_revenue['Cost of Revenue'][j])
        
        except:
            cost_revenue['difference'][j] = 0
            # print(revenue['Total Revenue'][i])
            # print(cost_revenue['Cost of Revenue'][j])
        
        cost_revenue['revenue'][j] = revenue['Total Revenue'][i]

        j+=1

print(j)

cost_revenue

cost_revenue['Gross Margin (in percent)'] = cost_revenue['difference']/cost_revenue['revenue']*100
cost_revenue

cost_revenue.to_csv('annual_gross_margin.csv')

not_found = []

for i in revenue_dict.keys():
    if i not in cost_of_revenue_dict.keys():
        not_found.append(i)

not_found

for i in range(0, len(revenue)):
    if revenue['cik'][i] in not_found:
        cost_revenue = cost_revenue.append({"cik": revenue['cik'][i], 
                 "date": revenue['date'][i],
                 "Cost of Revenue": 0,
                 "filenames": revenue['filenames'][i] ,
                 "difference": revenue['Total Revenue'][i],
                "revenue": revenue['Total Revenue'][i],
                "Gross Margin (in percent)": 100
                    }, ignore_index=True)

cost_revenue

cost_revenue.to_csv('annual_gross_margin2.csv')

balance_sheet = pd.read_csv('Annual_balance_sheet_se_metrics.csv')
balance_sheet.drop(['Unnamed: 0'], axis=1, inplace=True)
balance_sheet

cac_sheet = pd.read_csv('annual_CAC Payback_Gross Margin_ CAC.csv')
cac_sheet.drop(['Unnamed: 0.1.1', 'Unnamed: 0.1', 'Unnamed: 0'], axis=1, inplace=True)
cac_sheet

def intersection(lst1, lst2):
    lst3 = [value for value in lst1 if value in lst2]
    return lst3

balance_sheet.columns
common_cols = intersection(balance_sheet.columns, cac_sheet.columns)
balance_sheet_columns = [x for x in balance_sheet.columns if x not in common_cols]
balance_sheet_columns

len(balance_sheet)

for i in range(0, len(balance_sheet_columns)):
    cac_sheet[balance_sheet_columns[i]] = np.nan*len(cac_sheet)

for i in range(0, len(cac_sheet)):
    print(i)
    for j in range(0, len(balance_sheet)):
        if cac_sheet['cik'][i] == balance_sheet['cik'][j] and cac_sheet['date'][i]==balance_sheet['date'][j]:
            for k in range(0, len(balance_sheet_columns)):
                cac_sheet[balance_sheet_columns[k]][i] = balance_sheet[balance_sheet_columns[k]][j]

        else:
            for k in range(0, len(balance_sheet_columns)):
                cac_sheet[balance_sheet_columns[k]][i] = np.nan

cac_sheet.head(20)

pd.set_option("display.max_columns", None)

merged_df = cac_sheet.merge(balance_sheet, how = 'left', on = ['cik', 'date'])
merged_df.head(20)

merged_df.drop(['filenames_y'], axis=1, inplace=True)

print(merged_df.columns)

merged_df.to_csv('annual_combined_df.csv')

df = pd.read_csv('annual_saare_metrics_v2.csv')

df

ar = []
for i in range(len(df)):
    x = df["date"][i]
    if(x == "ttm"):
        ar.append(("ttm"))
        continue
    month, date, year = x.split("/")
    ar.append(year)
    # else:
    #     ar.append(("err", "err"))
    
ar

len(ar)

temar = [i for i, x in enumerate(ar) if x ==("err", "err") ]

temar

df.loc[temar][0:50]

df['year'] = ar

df.head()

x = df[df["cik"] == 1107843]

x

df.drop([df.columns[0], df.columns[1]], axis=1, inplace = True)

df

df2 = pd.read_csv(r"10q_url_date_cik.csv")

df2

ar = []
for i in range(len(df2)):
    x = df2["Date2"][i]
    if(x == "Date not found"):
        ar.append("-1")
        continue
    
    year = x[-4:]
    ar.append(year)
    # else:
    #     ar.append(("err", "err"))
print(ar)
print(len(ar))

df2["year"] = ar

df2.loc[134]

df["url"] = [""]*len(df)

for i in range(len(df2)):
    cik, year = df2["cik"][i], df2["year"][i]
    for j in range(len(df)):
        if( df["cik"][j] == cik and df["year"][j] == year) :
            df["url"][j] = df2["url"][i]

df

print(list(df['url']))

df.to_csv('annual_final_all_metrics.csv')

len(df[df["url"] == ""])

len(df2)

df3 = pd.read_csv(r"10k_cik_date_link.csv")

df3.shape

ar = []
for i in range(len(df3)):
    x = df3["Date2"][i]
    if(x.lower() == "date not found"):
        ar.append("-1")
        continue
    
    year = x[-4:]
    ar.append(year)

    # else:
    #     ar.append(("err", "err"))

len(ar)

df3["year"] = ar

temp = 0
for i in range(len(df3)):
    cik, year = df3["cik"][i], df3["year"][i]
    for j in range(len(df)):
        if( df["cik"][j] == cik and df["year"][j] == year) :
            if(df["url"][j] != ""):
                temp+=1
            df["url"][j] = df3["url"][i]

temp

print(i, j)

df.loc[823]

print(df3.loc[7])

df

len(df[df["url"] == ""])

df.to_csv('annual_final_all_metrics_v2.csv')

df.columns

df['year_month_date'] = str(df['year'])+'_01_01'
for i in range(len(df)):

df.head()

