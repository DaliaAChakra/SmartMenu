from django.urls import path
from . import views

urlpatterns = [
    path('AdminOrders/', views.Admin),
    path('ChefOrders/', views.Chef),
    path('Menu/', views.Menu),
]
