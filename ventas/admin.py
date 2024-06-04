from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Producto, Cliente, Pedido, Entrega, Domiciliario, DetallePedido, Venta, DetalleVenta, ColaDomiciliarios, DireccionesCliente

admin.site.register(Producto)
admin.site.register(Cliente)
admin.site.register(Pedido)
admin.site.register(Entrega)
admin.site.register(Domiciliario)
admin.site.register(DetallePedido)
admin.site.register(Venta)
admin.site.register(DetalleVenta)
admin.site.register(ColaDomiciliarios)
admin.site.register(DireccionesCliente)
