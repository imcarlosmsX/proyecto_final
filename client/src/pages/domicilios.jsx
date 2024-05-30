import React, { useState, useEffect } from 'react';
import { getPedidos, getVentas, getDetallesVentas, getProductos } from '../api/registro.api';
import { toast } from 'react-hot-toast';
import './domicilios.css'; // Asegúrate de tener un archivo CSS para los estilos

export function Domicilios() {
    const [pedidos, setPedidos] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [detallesVentas, setDetallesVentas] = useState([]);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pedidosResponse = await getPedidos();
                setPedidos(pedidosResponse.data);

                const ventasResponse = await getVentas();
                setVentas(ventasResponse.data);

                const detallesVentasResponse = await getDetallesVentas();
                setDetallesVentas(detallesVentasResponse.data);

                const productosResponse = await getProductos();
                setProductos(productosResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error al obtener los datos');
            }
        };

        fetchData();
    }, []);

    const actualizarPagina = () => {
        window.location.reload();
    };

    const renderTarjetas = () => {
        return pedidos.map((pedido) => {
            const venta = ventas.find(v => v.codigo_venta === pedido.codigo_venta);
            if (!venta) {
                console.error(`No se encontró la venta para el pedido con código: ${pedido.codigo_pedido}`);
                return (
                    <div key={pedido.codigo_pedido} className="tarjeta-pedido">
                        <h2>Pedido #{pedido.codigo_pedido}</h2>
                        <p>Error: No se encontró la venta asociada.</p>
                    </div>
                );
            }

            const detalles = detallesVentas.filter(d => d.venta === venta.codigo_venta);
            const productosVenta = detalles.map(detalle => {
                const producto = productos.find(p => p.codigo_producto === detalle.producto);
                return { ...producto, cantidad: detalle.cantidad };
            });

            return (
                <div key={pedido.codigo_pedido} className="tarjeta-pedido">
                    <h2>Pedido #{pedido.codigo_pedido}</h2>
                    <p>Tipo de entrega: {pedido.tipo_entrega}</p>
                    <p>Total venta: ${venta.total_venta}</p>
                    <p>Estado: {pedido.estado}</p>
                    <h3>Productos:</h3>
                    <ul>
                        {productosVenta.map((producto, index) => (
                            <li key={index}>
                                {producto ? `${producto.nombre} - Cantidad: ${producto.cantidad}` : 'Producto no encontrado'}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        });
    };

    return (
        <div>
            <h1>Domicilios para Entregar</h1>
            <div className="tarjetas-container">
                {renderTarjetas()}
            </div>
            <button onClick={actualizarPagina}>Actualizar estado del pedido</button>
        </div>
    );
}
