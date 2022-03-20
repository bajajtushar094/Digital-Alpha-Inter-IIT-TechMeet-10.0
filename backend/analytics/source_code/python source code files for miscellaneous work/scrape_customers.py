import urllib
import bs4
import requests
import webbrowser
import pandas as pd
from selenium import webdriver
from bs4 import BeautifulSoup
import time
from bs4.element import Tag
import path
import os
df = pd.read_csv("CIKtoTicker.csv")
companies = df["Company"].tolist()
companies = [' '.join(x.lower().split()[:-1]) for x in companies]
print(companies)

df2 = pd.DataFrame()
df2["Company"]=[]
df2["Customers"] =[]
df2["Text"]=[]


company = "apple"


with open("customers_scraped_google.csv",'a+') as file:
    for company in companies:
        text = f'how many customers does {company} have'
        text = urllib.parse.quote_plus(text)

        url = 'https://google.com/search?q=' + text




        driver = webdriver.Chrome('/usr/bin/chromedriver')

        driver.get(url)
        time.sleep(3)

        soup = BeautifulSoup(driver.page_source,'lxml')
        result_div = soup.find_all('span', attrs={'class': 'hgKElc'})
        try:
            highlighted = result_div[0]
            bolded = result_div[0].find_all('b')

            # df2.append({"Company":company, "Customers":bolded[0].text, "Text":highlighted.text}, ignore_index= True)
            file.write(f"{company}, {bolded[0].text}, {highlighted.text}\n")
            print(bolded[0].text)
        except:
            print(f"Could not find for {company}")

    output_path='customers_scraped_google.csv'
    print(df2)
    # df2.to_csv(output_path,mode='a', header=not os.path.exists(output_path), index = False)

