# Generated by Django 3.2.25 on 2024-07-03 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agents', '0005_auto_20240702_0109'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agent',
            name='interruption',
            field=models.CharField(blank=True, default='100', max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='temperature',
            field=models.CharField(blank=True, default='0.5', max_length=255, null=True),
        ),
    ]
