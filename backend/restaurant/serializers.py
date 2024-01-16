from rest_framework import serializers
from .models import *


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminOrder
        fields = ['id', 'name', 'order_date', 'description','table']


class ChefSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChefOrder
        fields = ['id', 'name', 'order_date', 'description','table']


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'description', 'price']
