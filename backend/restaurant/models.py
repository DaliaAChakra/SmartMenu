from django.db import models


class AdminOrder(models.Model):
    name = models.CharField(max_length=200)
    order_date = models.DateField()
    description = models.TextField()
    table = models.CharField(max_length=50, default='')

    def __str__(self):
        return self.name


class ChefOrder(models.Model):
    name = models.CharField(max_length=200)
    order_date = models.DateField()
    description = models.TextField()
    table = models.CharField(max_length=50, default='')

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.name
