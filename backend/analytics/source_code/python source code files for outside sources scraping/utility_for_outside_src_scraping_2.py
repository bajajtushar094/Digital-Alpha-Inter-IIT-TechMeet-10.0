# -*- coding: utf-8 -*-
"""utility_for_outside_src_scraping_2.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/17AH7u9Iix7n4DSgjtrPkVQ--k4c6O96Y
"""

import requests
from bs4 import BeautifulSoup # pip install beautlfulsoup4
import pandas as pd # pip install pandas
import win32com.client as win32

df = pd.DataFrame({'A': [10, 20], 'B': [39, 49]})
df.size

tickers = ['tsla', 'fb', 'goog', 'crm']
headers= {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0'}

xlApp = win32.Dispatch('Excel.Application')
xlApp.Visible = True
wb = xlApp.Workbooks.Add()

for ticker in tickers:
    url = "https://www.marketwatch.com/investing/stock/{0}/company-profile".format(ticker)
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')

    profile_info = {}

    element_tables = soup.select("div[class='element element--table']")
    for element_table in element_tables:
        valuation_type = element_table.h2.text.strip()
        df = pd.read_html(str(element_table))[0]
        profile_info[valuation_type] = df

    """
    Export data to Excel spreadsheets
    """
    ws = wb.Worksheets.Add()
    ws.name = ticker

    row_spacing = 2
    
    for table in profile_info.items():
        lastrow = ws.Cells(ws.rows.count, 1).End(-4162).row
        ws.cells(lastrow+row_spacing, 1).value = table[0]
        ws.cells(lastrow+row_spacing, 1).font.bold = True

        ws.Range(
            ws.cells(lastrow+row_spacing+1, 1),
            ws.cells(lastrow+table[1].shape[0]+row_spacing, table[1].shape[1])
        ).value = table[1].values
    
    ws.Rows('1:' + str(row_spacing)).delete
    ws.columns(1).columnwidth = 30
    ws.columns(2).columnwidth = 15