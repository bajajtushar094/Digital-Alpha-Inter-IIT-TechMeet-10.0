from core.models import *
import pandas as pd
import csv

df = pd.read_csv("./core/csv_files/customer_numeric_data_links.csv", on_bad_lines='skip')
# print("dataframe",df[5])

customers = df[5]
urls = df[6]

i=0
for customer in customers:
    pass