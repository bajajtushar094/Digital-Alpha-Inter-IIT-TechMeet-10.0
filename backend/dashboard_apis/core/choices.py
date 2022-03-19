FILING_TYPES = [
	('10K', '10K'),
	('10Q', '10Q'),
	('8K', '8K'),
]

METRIC_TYPES = [
  	('Total Revenue','Total Revenue'),
	('ARR', 'Annual Recurring Revenue'),
  	('MRR','MRR'),
  	('MRR Expansion','MRR Expansion'),
  	('ARPU','ARPU'),
	('CAC', 'Customer Acquisition Cost'),
	('ARPA', 'Average Run Per Account'),
	('RCC', 'Revenue Churn Rate'),
	("No Of Customers", "No Of Customers"),
  	('MRR Expansion', 'MRR Expansion'),
  	('Number of qualified leads', 'Number of qualified leads'),
  	('Penetration Rate', 'Penetration Rate'),
  	('Sales and Marketing', 'Sales and Marketing'),
  	('CAC payback', 'CAC payback'),
  	('Gross Margin', 'Gross Margin'),
	('CAC payback period','CAC payback period'),
	('ASP','ASP'),
	('Total Assets','Total Assets'),
	('Total Liabilities Net Minority Interest','Total Liabilities Net Minority Interest'),
	('debt ratio','debt ratio'),
	('Total Equity Gross Minority Interest','Total Equity Gross Minority Interest'),
	('Total Debt','Total Debt'),
	('Common Stock Equity','Common Stock Equity'),
	('Total Capitalization','Total Capitalization'),
	('Shareholder Equity','Shareholder Equity'),
	('Private Shareholding','Private Shareholding'),
	('Public Shareholding','Public Shareholding'),
]

METRIC_UNITS = [
	('B', 'Billion'),
	('M', 'Million'),
	('K', 'Thousand'),
	('%', 'Percent'),
	('USD','USD'),
	('Thousand USD', 'Thousand USD'),
	('Number', 'Number'),
	('Ratio','Ratio'),
]

SOURCE_TYPES = [
	('url', 'URL'), 
	('filing', 'Filing')
]


SENTIMENT_LABELS = [
    ('good', 'good'), 
    ('bad', 'bad'), 
    ('neutral', 'neutral')
]

MONTH_MAPPING = {
	'01':"Jan",
	'02':"Feb",
	'03':"Mar",
	'04':"Apr",
	'05':"May",
	'06':"Jun",
	'07':"Jul",
	'08':"Aug",
	'09':"Sep",
	'10':"Oct",
	'11':"Nov",
	'12':"Dec",
}
