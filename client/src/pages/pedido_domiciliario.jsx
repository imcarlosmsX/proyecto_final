import React, { useState, useEffect } from 'react';
import { getPedidos, getVenta, getDetallesVentas, getProductos, createEntrega, getClientes, updatePedido, updateEntrega, createCola } from '../api/registro.api';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

export function PedidoDomiciliario() {
    const location = useLocation();
    const domiciliario = location.state.domiciliario;
    const [pedidoActual, setPedidoActual] = useState(null);
    const [ventaActual, setVentaActual] = useState(null);
    const [detallesVenta, setDetallesVenta] = useState([]);
    const [productos, setProductos] = useState([]);
    const [clienteActual, setCliente] = useState(null);
    const [entregaIniciada, setEntregaIniciada] = useState(false);
    const [entregaCodigo, setEntregaCodigo] = useState(null);

    useEffect(() => {
        const fetchPedidoActual = async () => {
            try {
                const response = await getPedidos();
                const pedidos = response.data;
                const pedido = pedidos.find(p => p.codigo_domiciliario === domiciliario.codigo_domiciliario && p.estado === 'Pendiente' && p.tipo_entrega === 'Domicilio');
                setPedidoActual(pedido);
                if (pedido) {
                    const ventaResponse = await getVenta(pedido.codigo_venta);
                    setVentaActual(ventaResponse.data);

                    const clienteResponse = await getClientes();
                    const cliente = clienteResponse.data.find(c => c.codigo_cliente === pedido.codigo_cliente);
                    setCliente(cliente);
                }
            } catch (error) {
                console.error("Error fetching pedido actual:", error);
            }
        };

        fetchPedidoActual();
    }, [domiciliario]);

    useEffect(() => {
        const fetchDetallesYProductos = async () => {
            if (ventaActual) {
                try {
                    const detallesResponse = await getDetallesVentas();
                    const detalles = detallesResponse.data.filter(d => d.venta === ventaActual.codigo_venta);
                    setDetallesVenta(detalles);

                    const productosResponse = await getProductos();
                    setProductos(productosResponse.data);
                } catch (error) {
                    console.error("Error fetching detalles de la venta y productos:", error);
                }
            }
        };

        fetchDetallesYProductos();
    }, [ventaActual]);

    const handleEmpezarEntrega = async () => {
        if (pedidoActual && !entregaIniciada) {
            try {
                const response = await createEntrega({ codigo_pedido: pedidoActual.codigo_pedido, codigo_domiciliario: domiciliario.codigo_domiciliario });
                const entregaCodigo = response.data.codigo_entrega;
                await updatePedido(pedidoActual.codigo_pedido, { estado: 'En camino' });
                toast.success("Entrega iniciada correctamente");
                setEntregaIniciada(true);
                setEntregaCodigo(entregaCodigo);
            } catch (error) {
                console.error("Error iniciando entrega:", error);
                toast.error("Error al iniciar la entrega");
            }
        } else {
            toast.error("No hay pedido asignado en este momento");
        }
    };

    const handlePedidoEntregado = async () => {
        try {
            await updateEntrega(entregaCodigo, { estado: 'Entregado'});
            await updatePedido(pedidoActual.codigo_pedido, { estado: 'Entregado' });
            await createCola({ codigo_domiciliario: domiciliario.codigo_domiciliario });
            toast.success("Pedido entregado correctamente");
            setPedidoActual({ ...pedidoActual, estado: 'Entregado' });
            window.location.reload(); // Actualizar la página
        } catch (error) {
            console.error("Error al marcar el pedido como entregado:", error);
            toast.error("Error al marcar el pedido como entregado");
        }
    };

    const renderProductos = () => {
        return detallesVenta.map(detalle => {
            const producto = productos.find(p => p.codigo_producto === detalle.producto);
            if (producto) {
                return (
                    <li key={detalle.codigo_detalle}>
                        {producto.nombre} - Cantidad: {detalle.cantidad}
                    </li>
                );
            } else {
                return <li key={detalle.codigo_detalle}>Producto no encontrado</li>;
            }
        });
    };

    return (
        <div>
            {pedidoActual ? (
                <div>
                    <h2>Pedido Actual</h2>
                    <p>Fecha del Pedido: {pedidoActual.fecha_pedido}</p>
                    <p>Estado: {pedidoActual.estado}</p>
                    <h3>Cliente</h3>
                    {clienteActual && (
                        <>
                            <p>Nombre: {clienteActual.nombre} {clienteActual.apellido}</p>
                            <p>Dirección: {clienteActual.direccion}</p>
                        </>
                    )}
                    {ventaActual && (
                        <>
                            <p>Total Venta: ${ventaActual.total_venta}</p>
                            <h3>Productos</h3>
                            <ul>
                                {renderProductos()}
                            </ul>
                        </>
                    )}
                    {!entregaIniciada && (
                        <button onClick={handleEmpezarEntrega}>Iniciar Entrega</button>
                    )}
                    {entregaIniciada && (
                        <button onClick={handlePedidoEntregado}>Pedido Entregado</button>
                    )}
                </div>
            ) : (
                <p>No hay pedido asignado en este momento</p>
            )}
        </div>
    );
}
