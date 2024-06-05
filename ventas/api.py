from .models import *
from rest_framework import viewsets, permissions
from .serializers import *
from django.db.models import Count, Sum, DateTimeField
from django.db.models.functions import TruncDay
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from datetime import timezone 

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProductoSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ClienteSerializer

class DireccionesClienteViewSet(viewsets.ModelViewSet):
    queryset = DireccionesCliente.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DireccionesClienteSerializer

class DomiciliarioViewSet(viewsets.ModelViewSet):
    queryset = Domiciliario.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DomiciliarioSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PedidoSerializer
    
    def perform_create(self, serializer):
        # Buscar el domiciliario disponible
        try:
            cola_domiciliario = ColaDomiciliarios.objects.order_by('timestamp').first()
            if cola_domiciliario:
                serializer.save(codigo_domiciliario=cola_domiciliario.codigo_domiciliario)
                cola_domiciliario.delete()  # Eliminar el domiciliario de la cola
            else:
                serializer.save(codigo_domiciliario=None)  # No hay domiciliarios disponibles
        except ColaDomiciliarios.DoesNotExist:
            serializer.save(codigo_domiciliario=None)  # No hay domiciliarios disponibles

    @action(detail=False, methods=['get'])
    def pedidos_por_dia(self, request):
        pedidos = Pedido.objects.annotate(day=TruncDay('fecha_pedido')).values('day').annotate(count=Count('codigo_pedido')).order_by('day')
        return Response(pedidos)

    @action(detail=False, methods=['get'])
    def pedidos_periodo(self, request):
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        pedidos = Pedido.objects.filter(fecha_pedido__range=[start_date, end_date]).count()
        return Response({'total_pedidos': pedidos})

class ColaDomiciliariosViewSet(viewsets.ModelViewSet):
    queryset = ColaDomiciliarios.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ColaDomiciliariosSerializer

class EntregaViewSet(viewsets.ModelViewSet):
    queryset = Entrega.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = EntregaSerializer

    @action(detail=True, methods=['post'])
    def marcar_entregado(self, request, pk=None):
        entrega = self.get_object()
        entrega.estado = 'Entregado'
        entrega.hora_fin = timezone.now()
        entrega.save()

        # Verificar si hay pedidos sin domiciliario asignado
        pedido_sin_domiciliario = Pedido.objects.filter(codigo_domiciliario__isnull=True).first()
        if pedido_sin_domiciliario:
            pedido_sin_domiciliario.codigo_domiciliario = entrega.codigo_domiciliario
            pedido_sin_domiciliario.save()
        else:
            # Agregar domiciliario de nuevo a la cola
            ColaDomiciliarios.objects.create(codigo_domiciliario=entrega.codigo_domiciliario)
        
        return Response({'status': 'entregado'}, status=status.HTTP_200_OK)

class VentaViewSet(viewsets.ModelViewSet):
    queryset = Venta.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = VentaSerializer

    @action(detail=False, methods=['get'])
    def popularidad_productos(self, request):
        productos = DetalleVenta.objects.values('producto__nombre').annotate(total=Sum('cantidad')).order_by('-total')
        return Response(productos)

class DetalleVentaViewSet(viewsets.ModelViewSet):
    queryset = DetalleVenta.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DetalleVentaSerializer
