# Generated by Django 5.0.3 on 2024-06-04 06:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notesapp', '0006_alter_category_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='description',
            field=models.TextField(),
        ),
    ]
