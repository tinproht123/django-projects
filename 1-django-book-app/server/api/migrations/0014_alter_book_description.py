# Generated by Django 4.1 on 2022-08-16 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_alter_author_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='description',
            field=models.TextField(default="This book doesn't have description yet!", max_length=1500),
        ),
    ]