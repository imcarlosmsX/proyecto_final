from django.db import models
# Create your models here.


class Producto(models.Model):
    codigo_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.CharField(max_length=100)

class Cliente(models.Model):
    codigo_cliente = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)
    direccion = models.TextField()
    telefono = models.CharField(max_length=20)
    user_name = models.CharField(max_length=50, unique=True, default='')
    password = models.CharField(max_length=50, default='')


class Domiciliario(models.Model):
    codigo_domiciliario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)
    medio_transporte = models.CharField(max_length=50)
    licencia_conduccion = models.CharField(max_length=50)
    fecha_vencimiento_licencia = models.DateField()
    horario_disponibilidad = models.CharField(max_length=255)

class Pedido(models.Model):
    codigo_pedido = models.AutoField(primary_key=True)
    codigo_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    codigo_producto = models.ForeignKey(Producto, on_delete=models.CASCADE, default=1)
    fecha_pedido = models.DateField(auto_now=True)
    estado = models.CharField(max_length=50, default='Pendiente')
    tipo_entrega = models.CharField(max_length=50)

class DetallePedido(models.Model):
    codigo_detalle = models.AutoField(primary_key=True)
    codigo_pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    codigo_producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio_total = models.DecimalField(max_digits=10, decimal_places=2)

class Entrega(models.Model):
    codigo_entrega = models.AutoField(primary_key=True)
    codigo_pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    codigo_domiciliario = models.ForeignKey(Domiciliario, on_delete=models.CASCADE)
    fecha_envio = models.DateField()
    hora_envio = models.TimeField()
    fecha_fin = models.DateField()
    hora_fin = models.TimeField()