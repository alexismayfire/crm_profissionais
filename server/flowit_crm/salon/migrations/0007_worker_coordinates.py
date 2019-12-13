# Generated by Django 2.2.5 on 2019-12-13 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('salon', '0006_imagefield_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='worker',
            name='address',
            field=models.CharField(default='teste', max_length=100, verbose_name='Address'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='worker',
            name='latitude',
            field=models.DecimalField(decimal_places=6, default=1, max_digits=9, verbose_name='Latitude'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='worker',
            name='longitude',
            field=models.DecimalField(decimal_places=6, default=1, max_digits=9, verbose_name='Longitude'),
            preserve_default=False,
        ),
    ]
