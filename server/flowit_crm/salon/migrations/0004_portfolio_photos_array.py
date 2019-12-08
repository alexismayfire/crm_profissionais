# Generated by Django 2.2.5 on 2019-12-06 14:34

import django.contrib.postgres.fields
from django.db import migrations, models
import flowit_crm.salon.models


class Migration(migrations.Migration):

    dependencies = [
        ('salon', '0003_workerservice_newfield'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='workerportfolio',
            name='photo',
        ),
        migrations.AddField(
            model_name='workerportfolio',
            name='photos',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.ImageField(upload_to=flowit_crm.salon.models.worker_media_path, verbose_name='Photo'), blank=True, default='{}', size=None),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='workerportfolio',
            name='label',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.TextField(verbose_name='Label'), blank=True, size=None),
        ),
    ]