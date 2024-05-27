import axios from 'axios';

// Para Clientes
export const getClientes = () => axios.get('http://127.0.0.1:8000/clientes/')
export const createCliente =  (cliente) => axios.post('http://127.0.0.1:8000/clientes/', cliente)

//para pedidos
export const createPedidos = (pedido) => axios.post('http://127.0.0.1:8000/pedidos/', pedido)

//para productos
export const getProductos = () => axios.get('http://127.0.0.1:8000/productos/')


