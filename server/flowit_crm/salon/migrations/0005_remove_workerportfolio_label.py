# Generated by Django 2.2.5 on 2019-12-06 15:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('salon', '0004_portfolio_photos_array'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='workerportfolio',
            name='label',
        ),
    ]
