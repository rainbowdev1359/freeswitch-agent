# Generated by Django 3.2.25 on 2024-06-28 16:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('agents', '0002_auto_20240628_1303'),
        ('calls', '0007_alter_call_record'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='call',
            name='agent_id',
        ),
        migrations.AddField(
            model_name='call',
            name='agent',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='calls', to='agents.agent'),
            preserve_default=False,
        ),
    ]
