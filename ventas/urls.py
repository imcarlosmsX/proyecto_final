from rest_framework import routers
from .api import *
router = routers.DefaultRouter()



router.register('productos', ProductoViewSet)
router.register('clientes', ClienteViewSet)
router.register('domiciliarios', DomiciliarioViewSet)
router.register('pedidos', PedidoViewSet)
router.register('detallepedidos', DetallePedidoViewSet)
router.register('entregas', EntregaViewSet)
router.register('ventas', VentaViewSet)
router.register('detalleventas', DetalleVentaViewSet)
router.register('coladomiciliarios', ColaDomiciliariosViewSet)
router.register('direcciones', DireccionesClienteViewSet)


urlpatterns = router.urls

