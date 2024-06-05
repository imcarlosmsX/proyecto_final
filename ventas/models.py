from django.db import models

class Producto(models.Model):
    codigo_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.CharField(max_length=100)
    imagen = models.URLField(default='')

class Cliente(models.Model):
    codigo_cliente = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    user_name = models.CharField(max_length=50, unique=True, default='')
    password = models.CharField(max_length=50, default='')

class DireccionesCliente(models.Model):
    codigo_direccion = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='direcciones')
    direccion = models.TextField()

class Domiciliario(models.Model):
    codigo_domiciliario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)
    medio_transporte = models.CharField(max_length=50)
    licencia_conduccion = models.CharField(max_length=50)
    fecha_vencimiento_licencia = models.DateField()

class Venta(models.Model):
    codigo_venta = models.AutoField(primary_key=True)
    hora_venta = models.TimeField(auto_now=True)
    fecha_venta = models.DateField(auto_now=True)
    total_venta = models.DecimalField(max_digits=10, decimal_places=2)
    cod_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    productos = models.ManyToManyField(Producto, through='DetalleVenta')

class DetalleVenta(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)

class Pedido(models.Model):
    codigo_pedido = models.AutoField(primary_key=True)
    codigo_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    codigo_venta = models.ForeignKey(Venta, on_delete=models.CASCADE, default='1')
    fecha_pedido = models.DateField(auto_now=True)
    estado = models.CharField(max_length=50, default='Pendiente')
    tipo_entrega = models.CharField(max_length=50)
    direccion_entrega = models.ForeignKey(DireccionesCliente, on_delete=models.CASCADE)
    codigo_domiciliario = models.ForeignKey(Domiciliario, on_delete=models.CASCADE, null=True, blank=True)

class Entrega(models.Model):
    codigo_entrega = models.AutoField(primary_key=True)
    codigo_pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    codigo_domiciliario = models.ForeignKey(Domiciliario, on_delete=models.CASCADE, null=True, blank=True)
    fecha_envio = models.DateField(auto_now=True)
    hora_envio = models.TimeField(auto_now=True)
    hora_fin = models.TimeField(null=True, blank=True)
    estado = models.CharField(max_length=50, default='En camino')

class ColaDomiciliarios(models.Model):
    codigo_cola = models.AutoField(primary_key=True)
    codigo_domiciliario = models.ForeignKey(Domiciliario, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
