# Generated by Django 4.1 on 2022-08-12 13:00

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='author',
            options={'ordering': ['created']},
        ),
        migrations.AlterModelOptions(
            name='book',
            options={'ordering': ['created']},
        ),
        migrations.AlterModelOptions(
            name='genre',
            options={'ordering': ['type']},
        ),
        migrations.AlterModelOptions(
            name='review',
            options={'ordering': ['created']},
        ),
        migrations.RemoveField(
            model_name='author',
            name='books',
        ),
        migrations.AddField(
            model_name='author',
            name='image',
            field=models.ImageField(default=django.utils.timezone.now, upload_to=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='book',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='book',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='author',
            name='description',
            field=models.TextField(default="This author doesn't have any description yet!", max_length=1500),
        ),
        migrations.AlterField(
            model_name='author',
            name='dob',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='book',
            name='author',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='author', to='api.author'),
        ),
        migrations.AlterField(
            model_name='book',
            name='description',
            field=models.TextField(default="This book doesn't have description yet!", max_length=1200),
        ),
        migrations.AlterField(
            model_name='genre',
            name='type',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
