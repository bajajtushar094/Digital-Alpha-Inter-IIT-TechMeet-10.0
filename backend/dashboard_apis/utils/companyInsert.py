from core.models import Company
import csv
import os

rootPath = os.getcwd()
filespath = os.path.join(rootPath, 'files/')

fileCIK = open(filespath + 'cik_with_ticker.csv')
csvreaderCIK = csv.reader(fileCIK)
headers = next(csvreaderCIK)
rowsCIK = {}
for row in csvreaderCIK:
    # data is provided in ticker cik name
    rowsCIK[row[0].upper()] = [row[0].upper(), row[1], row[2]]
fileCIK.close()

fileLogo = open(filespath + 'tickerToImage.csv')
csvreaderLogo = csv.reader(fileLogo)
headers = next(csvreaderLogo)
for row in csvreaderLogo:
    ticker = row[0].upper()
    rowsCIK[ticker] = [rowsCIK[ticker][0], rowsCIK[ticker][1], rowsCIK[ticker][2], row[1]]

correctedRowsCIK = {
    row[1]: row for ticker, row in rowsCIK.items()
}


companiesWithLogo = Company.objects.bulk_create(
    # data is provided in ticker cik name
    Company(cik=row[1], ticker=row[0], name=row[2], logo=row[3]) for row in correctedRowsCIK.values() if len(row) == 4 
)
companiesWithoutLogo = Company.objects.bulk_create(
    # data is provided in ticker cik name
    Company(cik=row[1], ticker=row[0], name=row[2]) for row in correctedRowsCIK.values() if len(row) == 3
)

#186 companies inserted after completion of this script
#if facing any error for uniqueness, run the cleanDB script