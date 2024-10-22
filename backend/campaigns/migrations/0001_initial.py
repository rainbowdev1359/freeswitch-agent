# Generated by Django 3.2.25 on 2024-07-01 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Agent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Campaign',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=50)),
                ('budget', models.DecimalField(decimal_places=2, max_digits=10)),
                ('dials', models.IntegerField()),
                ('list', models.CharField(max_length=100)),
                ('pickups', models.IntegerField()),
                ('failed', models.IntegerField()),
                ('busy', models.IntegerField()),
                ('amount_spent', models.DecimalField(decimal_places=2, max_digits=10)),
                ('outcome', models.CharField(max_length=100)),
                ('costOutcome', models.DecimalField(decimal_places=2, max_digits=10)),
                ('agents', models.ManyToManyField(to='campaigns.Agent')),
            ],
        ),
    ]
