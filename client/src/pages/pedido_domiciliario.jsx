import React, { useState, useEffect } from 'react';
import { getPedidos, getVenta, getDetallesVentas, getProductos, createEntrega, getClientes, updatePedido, updateEntrega, getCola, createCola, deleteCola } from '../api/registro.api';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import './compra.css';

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
    const [enServicio, setEnServicio] = useState(false);

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

    useEffect(() => {
        const checkServicio = async () => {
            try {
                const response = await getCola();
                const enCola = response.data.some(c => c.codigo_domiciliario === domiciliario.codigo_domiciliario);
                setEnServicio(enCola);
            } catch (error) {
                console.error("Error checking servicio:", error);
            }
        };

        checkServicio();
    }, [domiciliario]);

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
            await updateEntrega(entregaCodigo, { estado: 'Entregado' });
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

    const handleIngresarServicio = async () => {
        try {
            // Verificar si hay algún pedido con codigo_domiciliario nulo
            const response = await getPedidos();
            const pedidoSinAsignar = response.data.find(p => p.codigo_domiciliario === null);
            
            if (pedidoSinAsignar) {
                // Si hay un pedido sin asignar, asignarlo al domiciliario
                await updatePedido(pedidoSinAsignar.codigo_pedido, { codigo_domiciliario: domiciliario.codigo_domiciliario });
                toast.success("Pedido asignado correctamente");
                setPedidoActual(pedidoSinAsignar);
            } else {
                // Si no hay pedidos sin asignar, agregar al domiciliario en la cola
                await createCola({ codigo_domiciliario: domiciliario.codigo_domiciliario });
                toast.success("Ingresado en servicio correctamente");
                setEnServicio(true);
            }
        } catch (error) {
            console.error("Error al ingresar en servicio:", error);
            toast.error("Error al ingresar en servicio");
        }
    };
    

    const handleSalirServicio = async () => {
        try {
            const response = await getCola();
            const cola = response.data.find(c => c.codigo_domiciliario === domiciliario.codigo_domiciliario);
            if (cola) {
                await deleteCola(cola.codigo_cola);
                toast.success("Salido de servicio correctamente");
                setEnServicio(false);
            } else {
                toast.error("Domiciliario no encontrado en la cola");
            }
        } catch (error) {
            console.error("Error al salir de servicio:", error);
            toast.error("Error al salir de servicio");
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
        <div className="pedido-info-container">
            {!pedidoActual && !enServicio && (
                <button onClick={handleIngresarServicio} className='boton-carrito'>Ingresar en servicio</button>
            )}
            {enServicio && !pedidoActual && (
                <button onClick={handleSalirServicio} className='boton-carrito'>Salir de servicio</button>
            )}
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
                            <ul className="productos-lista">
                                {renderProductos()}
                            </ul>
                        </>
                    )}
                    {!entregaIniciada && (
                        <button onClick={handleEmpezarEntrega} className='boton-carrito'>Iniciar Entrega</button>
                    )}
                    {entregaIniciada && (
                        <button onClick={handlePedidoEntregado} className='boton-carrito'>Pedido Entregado</button>
                    )}
                </div>
            ) : (
                <p>No hay pedido asignado en este momento</p>
            )}
        </div>
    );
    
}
