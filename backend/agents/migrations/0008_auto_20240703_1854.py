# Generated by Django 3.2.25 on 2024-07-03 18:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('agents', '0007_auto_20240703_1743'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='agent',
            name='Objectives',
        ),
        migrations.RemoveField(
            model_name='agent',
            name='Products',
        ),
        migrations.RemoveField(
            model_name='agent',
            name='Rules',
        ),
        migrations.RemoveField(
            model_name='agent',
            name='policies',
        ),
    ]