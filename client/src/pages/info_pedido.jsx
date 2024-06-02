import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductos, getDetallesVentas, getPedidos } from '../api/registro.api';
import './compra.css';

export function InfoPedido() {
    const location = useLocation();
    const { pedido, cliente, venta } = location.state || {};
    const [detallesVenta, setDetallesVenta] = useState([]);
    const [productos, setProductos] = useState([]);
    const [pedidoActual, setPedidoActual] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Realizar la consulta de los detalles de la venta
                const detallesVentaResponse = await getDetallesVentas();
                setDetallesVenta(detallesVentaResponse.data);

                // Realizar la consulta de todos los productos disponibles
                const productosResponse = await getProductos();
                setProductos(productosResponse.data);

                // Realizar la consulta de todos los pedidos
                const pedidosResponse = await getPedidos();
                const pedidos = pedidosResponse.data;

                // Filtrar el pedido actual
                const pedidoEncontrado = pedidos.find(pedido_actual => pedido_actual.codigo_pedido === pedido.codigo_pedido);
                setPedidoActual(pedidoEncontrado);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [pedido]); // Agregamos pedido como dependencia para que se actualice cuando cambie

    const actualizarEstadoPedido = async () => {
        try {
            // Aquí deberías enviar la solicitud para actualizar el estado del pedido
            // Puedes usar la función correspondiente de la API para enviar la solicitud al servidor
            // Por ejemplo, si tienes una función llamada `actualizarEstadoPedido` en tu API, puedes llamarla aquí
            // await actualizarEstadoPedido(pedidoActual.codigo_pedido);
            console.log("Estado del pedido actualizado");

            // Recargar la página para mostrar el estado actualizado del pedido
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

    // Filtrar los detalles de la venta asociados al pedido actual
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
            <p>Dirección de entrega: {cliente.direccion}</p>
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
