FILING_TYPES = [
    ('10K', '10K'),
    ('10Q', '10Q'),
    ('8K', '8K'),
]

METRIC_TYPES = [
	('ARR', 'Annual Recurring Revenue'),
	('CCR', 'Customer Churn Rate'),
	('LTV', 'Lifetime Value'),
	('CAC', 'Customer Acquisition Cost'),
	('ARPA', 'Average Run Per Account'),
	('RCC', 'Revenue Churn Rate')
]

METRIC_UNITS = [
	('B', 'Billion'),
	('M', 'Million'),
	('K', 'Thousand'),
	('%', 'Percent')
]

SOURCE_TYPES = [
    ('url', 'URL'), 
    ('filing', 'Filing')
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