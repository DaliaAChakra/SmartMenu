from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
import json


@api_view(['GET', 'POST'])
def Chef(request):
    if request.method == 'GET':
        orders = ChefOrder.objects.all()
        serializer = ChefSerializer(orders, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        json_data = json.loads(request.body)
        pk = json_data["pk"]
        try:
            admin_order = ChefOrder.objects.get(pk=pk)
            AdminOrder.objects.create(name=admin_order.name,
                                      order_date=admin_order.order_date,
                                      description=admin_order.description,
                                      table=admin_order.table,)
            admin_order.delete()
            return Response(status=204)
        except ChefOrder.DoesNotExist:
            return Response(status=404)


@api_view(['GET', 'POST'])
def Admin(request):
    if request.method == 'GET':
        orders = AdminOrder.objects.all()
        serializer = AdminSerializer(orders, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        json_data = json.loads(request.body)
        pk = json_data["pk"]
        destination = json_data["destination"]
        if destination == 'kitchen':
            try:
                admin_order = AdminOrder.objects.get(pk=pk)
                ChefOrder.objects.create(name=admin_order.name,
                                         order_date=admin_order.order_date,
                                         description=admin_order.description,
                                         table=admin_order.table,)
                admin_order.delete()
                return Response(status=204)
            except AdminOrder.DoesNotExist:
                return Response(status=404)

        elif destination == 'done':
            try:
                admin_order = AdminOrder.objects.get(pk=pk)
                admin_order.delete()
                return Response(status=204)
            except AdminOrder.DoesNotExist:
                return Response(status=404)


@api_view(['GET', 'POST'])
def Menu(request):
    if request.method == 'GET':
        orders = MenuItem.objects.all()
        serializer = MenuSerializer(orders, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        json_data = json.loads(request.body)
        name = json_data["name"]
        description = json_data["description"]
        date = json_data["date"]
        table = json_data["table"]

        AdminOrder.objects.create(name=name,
                                  order_date=date,
                                  description=description,
                                  table=table,)

        return Response(status=204)
