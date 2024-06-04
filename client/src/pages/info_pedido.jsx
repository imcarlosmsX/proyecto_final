import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductos, getDetallesVentas, getPedidos, getDirecciones } from '../api/registro.api';
import './compra.css';

export function InfoPedido() {
    const location = useLocation();
    const { pedido, cliente, venta } = location.state || {};
    const [detallesVenta, setDetallesVenta] = useState([]);
    const [productos, setProductos] = useState([]);
    const [pedidoActual, setPedidoActual] = useState(null);
    const [direccion, setDireccion] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const detallesVentaResponse = await getDetallesVentas();
                setDetallesVenta(detallesVentaResponse.data);

                const productosResponse = await getProductos();
                setProductos(productosResponse.data);

                const pedidosResponse = await getPedidos();
                const pedidos = pedidosResponse.data;

                const pedidoEncontrado = pedidos.find(pedido_actual => pedido_actual.codigo_pedido === pedido.codigo_pedido);
                setPedidoActual(pedidoEncontrado);

                if (pedidoEncontrado) {
                    const direccionesResponse = await getDirecciones();
                    const direccionEncontrada = direccionesResponse.data.find(dir => dir.codigo_direccion === pedidoEncontrado.direccion_entrega);
                    setDireccion(direccionEncontrada);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [pedido, cliente]);

    const actualizarEstadoPedido = async () => {
        try {
            console.log("Estado del pedido actualizado");
            window.location.reload();
        } catch (error) {
            console.error("Error updating pedido:", error);
        }
    };

    if (!pedidoActual) {
        return <div>No se encontraron datos del pedido.</div>;
    }
    if (!cliente) {
        return <div>No se encontraron datos del cliente.</div>;
    }
    if (!venta) {
        return <div>No se encontraron datos de la venta.</div>;
    }

    const detallesPedido = detallesVenta.filter(detalle => detalle.venta === venta.codigo_venta);

    return (
        <div className="pedido-info-container">
            <h1 className="pedido-info-title">Información del Pedido</h1>
            <p>Código del Pedido: {pedidoActual.codigo_pedido}</p>
            <p>Estimado {cliente.nombre}, aquí están los detalles de su pedido:</p>
            <p>Fecha del Pedido: {pedidoActual.fecha_pedido}</p>
            <p>Estado: {pedidoActual.estado} <button onClick={actualizarEstadoPedido} className='boton-carrito'>Actualizar estado del pedido</button> </p> 
            <p>Tipo de entrega: {pedidoActual.tipo_entrega}</p>
            <p>Fecha de la venta: {venta.fecha_venta}</p>
            <p>Total a pagar: ${venta.total_venta}</p>
            <p>Dirección de entrega: {direccion ? direccion.direccion : 'No disponible'}</p>
            <p>Teléfono de contacto: {cliente.telefono}</p>

            <h2>Productos Adquiridos</h2>
            <ul className="productos-list">
                {detallesPedido.map((detalle, index) => {
                    const producto = productos.find(producto => producto.codigo_producto === detalle.producto);
                    return (
                        <li key={index} className="producto-item">
                            {producto ? `${producto.nombre} - Cantidad: ${detalle.cantidad}` : 'Producto no encontrado'}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
