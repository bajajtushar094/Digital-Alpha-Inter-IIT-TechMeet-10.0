from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.base_user import BaseUserManager
from .choices import FILING_TYPES, METRIC_TYPES, METRIC_UNITS
from django.utils.translation import ugettext_lazy as _



class Company(models.Model):
	ticker = models.CharField(max_length=10, primary_key=True)
	name = models.CharField(max_length=256, unique=True)
	logo = models.ImageField(upload_to='images')

	def __str__(self):
		return f'{self.ticker} ({self.name})'



class UserManager(BaseUserManager):
	use_in_migrations = True

	def _create_user(self, email, password, **extra_fields):
		"""
		Creates and saves a User with the given email and password.
		"""
		if not email:
			raise ValueError('The given email must be set')
		email = self.normalize_email(email)
		user = self.model(email=email, **extra_fields)
		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_user(self, email, password=None, **extra_fields):
		# extra_fields.setdefault('is_superuser', False)
		return self._create_user(email, password, **extra_fields)

	def create_superuser(self, email, password, **extra_fields):
		extra_fields.setdefault('is_superuser', True)
		extra_fields.setdefault('is_staff', True)

		if extra_fields.get('is_superuser') is not True:
			raise ValueError('Superuser must have is_superuser=True.')

		return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
	email = models.EmailField(unique=True)
	first_name = models.CharField(max_length=30, blank=True)
	last_name = models.CharField(max_length=30, blank=True)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)
	recently_viewed_companies = models.ManyToManyField(Company, related_name='recently_viewed_by_user', blank=True)
	bookmarked_companies = models.ManyToManyField(Company, related_name='bookmarked_by_user', blank=True)
	objects = UserManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []

	class Meta:
		verbose_name = _('user')
		verbose_name_plural = _('users')

	def get_full_name(self):
		'''
		Returns the first_name plus the last_name, with a space in between.
		'''
		full_name = '%s %s' % (self.first_name, self.last_name)
		return full_name.strip()

	def get_short_name(self):
		'''
		Returns the short name for the user.
		'''
		return self.first_name


class Basket(models.Model):
	name = models.CharField(_('basket name'), max_length=32)
	companies = models.ManyToManyField(Company, blank=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='baskets')

	def __str__(self):
		return f'Basket-{self.name}' 


class Filing(models.Model):
	company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='filings')
	form_type = models.CharField(_('filing form type'), max_length=10, choices=FILING_TYPES)
	year = models.IntegerField()
	quarter = models.IntegerField(blank=True, null=True)		# null for yearly forms
	date = models.DateField(_('filing date'))
	verbose_text = models.TextField()				# Verbose text for drilldown

	def __str__(self):
		if self.quarter:
			return f'{self.company.name} - {self.form_type} - Y{self.year}Q{self.quarter}' 
		return f'{self.company.name} - {self.form_type} - Y{self.year}' 


class KeyMetric(models.Model):
	company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='key_metrics')
	filing = models.ForeignKey(Filing, on_delete=models.CASCADE, related_name='key_metrics')	# Filing for drilldown
	drilldown_offset = models.IntegerField()								# Drilldown Highlight offset
	drilldown_length = models.IntegerField()								# Drilldown Highlight length
	metric_type = models.CharField(max_length=32, choices=METRIC_TYPES)
	metric_value = models.DecimalField(max_digits=8, decimal_places=2)		# 53.53, 10.00
	metric_unit = models.CharField(max_length=5, choices=METRIC_UNITS)		# Eg. Billion, %, etc.
	# year = models.IntegerField()
	# quarter = models.IntegerField(blank=True, null=True)		# null for yearly forms

	def __str__(self):
		if self.filing.quarter:
			return f'{self.company.name} - {self.metric_type} - Y{self.filing.year}Q{self.filing.quarter}' 
		return f'{self.company.name} - {self.metric_type} - Y{self.filing.year}' 





