import axios from 'axios';

// Para Clientes
export const getClientes = () => axios.get('http://127.0.0.1:8000/clientes/')
export const createCliente =  (cliente) => axios.post('http://127.0.0.1:8000/clientes/', cliente)

//para pedidos
export const createPedidos = (pedido) => axios.post('http://127.0.0.1:8000/pedidos/', pedido)
export const getPedidos = () => axios.get('http://127.0.0.1:8000/pedidos/')

//para productos
export const getProductos = () => axios.get('http://127.0.0.1:8000/productos/')


//para las ventas
export const createVentas = (venta) => axios.post('http://127.0.0.1:8000/ventas/', venta)
export const getVentas = () => axios.get('http://127.0.0.1:8000/ventas/')
export const getVenta = (id) => axios.get('http://127.0.0.1:8000/ventas/', id)



//para detalles ventas
export const createDetallesVentas = (detalleVenta) => axios.post('http://127.0.0.1:8000/detalleventas/', detalleVenta)
export const getDetallesVentas = () => axios.get('http://127.0.0.1:8000/detalleventas/')
