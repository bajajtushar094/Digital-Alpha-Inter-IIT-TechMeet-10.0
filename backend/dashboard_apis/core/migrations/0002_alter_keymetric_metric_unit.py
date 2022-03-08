# Generated by Django 3.2.8 on 2022-03-08 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='keymetric',
            name='metric_unit',
            field=models.CharField(choices=[('B', 'Billion'), ('M', 'Million'), ('K', 'Thousand'), ('%', 'Percent')], max_length=5),
        ),
    ]
