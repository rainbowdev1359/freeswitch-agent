# Generated by Django 5.0.7 on 2024-07-24 07:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='role_manage_id',
            new_name='role_manage',
        ),
    ]
