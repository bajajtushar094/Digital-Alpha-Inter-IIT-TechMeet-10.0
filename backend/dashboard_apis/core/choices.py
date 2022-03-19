FILING_TYPES = [
    ('10K', '10K'),
    ('10Q', '10Q'),
    ('8K', '8K'),
]

METRIC_TYPES = [
    ('Total Revenue','Total Revenue'),
	('ARR', 'Annual Recurring Revenue'),
	('CCR', 'Customer Churn Rate'),
    ('MRR','MRR'),
    ('MRR Expansion','MRR Expansion'),
    ('ARPU','ARPU'),
	('LTV', 'Lifetime Value'),
	('CAC', 'Customer Acquisition Cost'),
	('ARPA', 'Average Run Per Account'),
	('RCC', 'Revenue Churn Rate'),
	("No Of Customers", "No Of Customers"),
    ('Churn', 'Churn'),
    ('MRR Expansion', 'MRR Expansion'),
    ('Number of qualified leads', 'Number of qualified leads'),
    ('Penetration Rate', 'Penetration Rate'),
    ('Sales and Marketing', 'Sales and Marketing'),
    ('CAC payback', 'CAC payback'),
    ('Gross Margin', 'ross Margin'),
]

METRIC_UNITS = [
	('B', 'Billion'),
	('M', 'Million'),
	('K', 'Thousand'),
	('%', 'Percent'),
    ('USD','USD'),
	('Thousand USD', 'Thousand USD'),
	('Number', 'Number'),
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