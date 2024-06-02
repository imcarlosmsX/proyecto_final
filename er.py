import pydot

# Create a new graph
graph = pydot.Dot(graph_type='digraph', rankdir='LR')

# Define nodes
entities = {
    'Producto': ['codigo_producto (PK)', 'nombre', 'descripcion', 'precio', 'categoria', 'imagen'],
    'Cliente': ['codigo_cliente (PK)', 'nombre', 'apellido', 'direccion', 'telefono', 'user_name', 'password'],
    'Domiciliario': ['codigo_domiciliario (PK)', 'nombre', 'apellido', 'medio_transporte', 'licencia_conduccion', 'fecha_vencimiento_licencia', 'horario_disponibilidad'],
    'Venta': ['codigo_venta (PK)', 'hora_venta', 'fecha_venta', 'total_venta', 'cod_cliente (FK)'],
    'DetalleVenta': ['venta (FK)', 'producto (FK)', 'cantidad'],
    'Pedido': ['codigo_pedido (PK)', 'codigo_cliente (FK)', 'codigo_venta (FK)', 'fecha_pedido', 'estado', 'tipo_entrega', 'codigo_domiciliario (FK)'],
    'DetallePedido': ['codigo_detalle (PK)', 'codigo_pedido (FK)', 'codigo_producto (FK)', 'cantidad', 'precio_total'],
    'Entrega': ['codigo_entrega (PK)', 'codigo_pedido (FK)', 'codigo_domiciliario (FK)', 'fecha_envio', 'hora_envio', 'hora_fin', 'estado'],
    'ColaDomiciliarios': ['codigo_cola (PK)', 'codigo_domiciliario (FK)', 'timestamp']
}

# Add nodes to the graph
for entity, attributes in entities.items():
    label = f'{entity}\n' + '\n'.join(attributes)
    node = pydot.Node(entity, label=label, shape='record')
    graph.add_node(node)

# Define relationships
relationships = [
    ('Cliente', 'Venta', '1:N'),
    ('Venta', 'DetalleVenta', '1:N'),
    ('Producto', 'DetalleVenta', '1:N'),
    ('Cliente', 'Pedido', '1:N'),
    ('Venta', 'Pedido', '1:1'),
    ('Pedido', 'DetallePedido', '1:N'),
    ('Producto', 'DetallePedido', '1:N'),
    ('Pedido', 'Entrega', '1:1'),
    ('Domiciliario', 'Entrega', '1:N'),
    ('Domiciliario', 'Pedido', '1:N'),
    ('Domiciliario', 'ColaDomiciliarios', '1:N')
]

# Add edges to the graph
for source, target, relationship in relationships:
    edge = pydot.Edge(source, target, label=relationship)
    graph.add_edge(edge)

# Save the graph as a PNG file
graph.write_png('diagrama_er.png')
