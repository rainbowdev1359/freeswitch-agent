# Generated by Django 5.0.7 on 2024-07-24 06:29

import django.core.files.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('knowledge', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='knowledge',
            name='file',
            field=models.FileField(blank=True, null=True, storage=django.core.files.storage.FileSystemStorage(location='/home/rootroot/work/nexvoz-api/media'), upload_to='knowledge_uploads/'),
        ),
    ]