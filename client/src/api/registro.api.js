import axios from 'axios';

// Para Clientes
export const getClientes = () => axios.get('http://127.0.0.1:8000/clientes/')
export const createCliente =  (cliente) => axios.post('http://127.0.0.1:8000/clientes/', cliente)

//para pedidos
export const createPedidos = (pedido) => axios.post('http://127.0.0.1:8000/pedidos/', pedido)
export const getPedidos = () => axios.get('http://127.0.0.1:8000/pedidos/')
export const updatePedido = (codigo_pedido, data) => axios.patch(`http://127.0.0.1:8000/pedidos/${codigo_pedido}/`, data);


//para productos
export const getProductos = () => axios.get('http://127.0.0.1:8000/productos/')


//para las ventas
export const createVentas = (venta) => axios.post('http://127.0.0.1:8000/ventas/', venta)
export const getVentas = () => axios.get('http://127.0.0.1:8000/ventas/')
export const getVenta = (id) => axios.get(`http://127.0.0.1:8000/ventas/${id}/`);


//para detalles ventas
export const createDetallesVentas = (detalleVenta) => axios.post('http://127.0.0.1:8000/detalleventas/', detalleVenta);
export const getDetallesVentas = () => axios.get('http://127.0.0.1:8000/detalleventas/');


//para los domiciliarios
export const getDomiciliarios = () => axios.get('http://127.0.0.1:8000/domiciliarios/');

//para las entregas
export const getEntregas = () => axios.get('http://127.0.0.1:8000/entregas/');
export const updateEntrega = (codigo_entrega, data) => axios.patch(`http://127.0.0.1:8000/entregas/${codigo_entrega}/`, data);
export const createEntrega = (entrega) => axios.post('http://127.0.0.1:8000/entregas/', entrega)

//para la cola
export const getCola = () => axios.get('http://127.0.0.1:8000/coladomiciliarios/');
export const createCola = (data) => axios.post('http://127.0.0.1:8000/coladomiciliarios/', data);
export const deleteCola = (id) => axios.delete(`http://127.0.0.1:8000/coladomiciliarios/${id}/`);


//para las estadisticas
export const getPedidosPorDia = () => axios.get('http://127.0.0.1:8000/pedidos/pedidos_por_dia/');
export const getPopularidadProductos = () => axios.get('http://127.0.0.1:8000/ventas/popularidad_productos/');
export const getPedidosPeriodo = (start_date, end_date) => axios.get(`http://127.0.0.1:8000/pedidos/pedidos_periodo/?start_date=${start_date}&end_date=${end_date}`);

//para las direcciones
export const createDireccionCliente = (direccion) => axios.post('http://127.0.0.1:8000/direcciones/', direccion);
export const getDirecciones = () => axios.get('http://127.0.0.1:8000/direcciones/')
