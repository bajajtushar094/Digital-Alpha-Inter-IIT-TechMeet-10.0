# -*- coding: utf-8 -*-
"""outside_src_scraping_3.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1ECzaxHjQ4l4qnMCm49uSwYtc7iLxKJ93
"""

import pandas as pd
from bs4 import BeautifulSoup
import re
from selenium import webdriver
import chromedriver_binary
import string

pd.options.display.float_format = '{:.0f}'.format

import numpy as np
import pandas as pd
from bs4 import BeautifulSoup
import requests
import re
from selenium import webdriver
import chromedriver_binary

is_link = 'https://finance.yahoo.com/quote/AAPL/financials?p=AAPL'
bs_link = 'https://finance.yahoo.com/quote/AAPL/balance-sheet?p=AAPL'
cf_link = 'https://finance.yahoo.com/quote/AAPL/cash-flow?p=AAPL'

def scraper_to_statement(link):
    
    headers = []
    temp_list = []
    final = []
    index = 0
    
    #pull data from link
    page_response = requests.get(link, timeout=1000)
    #structure raw data for parsing
    page_content = BeautifulSoup(page_response.content)
    #filter for items we want
    features = page_content.find_all('div',class_='D(tbr)')
    
    #create headers
    for item in features[0].find_all('div', class_='D(ib)'):
        headers.append(item.text)
        
    #statement contents
    while index <= len(features)-1:
        #filter for each line of the statement
        temp = features[index].find_all('div', class_='D(tbc)')
        for line in temp:
            #each item adding to a temporary list
            temp_list.append(line.text)
        #temp_list added to final list
        final.append(temp_list)
        #clear temp_list
        temp_list = []
        index+=1
    
    df = pd.DataFrame(final[1:])
    df.columns = headers
    
    return df

scraper_to_statement(is_link)

income_statement = financials[0]
balance_sheet = financials[1]
cash_flow_statement = financials[2]

financials

