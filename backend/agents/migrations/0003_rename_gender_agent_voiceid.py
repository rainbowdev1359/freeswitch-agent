# Generated by Django 3.2.25 on 2024-07-01 16:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('agents', '0002_auto_20240628_1303'),
    ]

    operations = [
        migrations.RenameField(
            model_name='agent',
            old_name='voiceID',
            new_name='voiceID',
        ),
    ]
