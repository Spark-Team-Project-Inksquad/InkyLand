# Generated by Django 2.1.5 on 2019-04-17 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inkybase', '0014_auto_20190416_1826'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='uploaded_file',
            field=models.FileField(upload_to='uploads'),
        ),
    ]