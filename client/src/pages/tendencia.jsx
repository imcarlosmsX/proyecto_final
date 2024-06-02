import React, { useState, useEffect } from 'react';
import { getPedidosPorDia, getPopularidadProductos, getPedidosPeriodo } from '../api/registro.api';
import './compra.css';

export function Tendencia() {
    const [pedidosPorDia, setPedidosPorDia] = useState([]);
    const [popularidadProductos, setPopularidadProductos] = useState([]);
    const [pedidosPeriodo, setPedidosPeriodo] = useState(0);
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-12-31');

    useEffect(() => {
        const fetchPedidosPorDia = async () => {
            try {
                const response = await getPedidosPorDia();
                setPedidosPorDia(response.data);
            } catch (error) {
                console.error('Error fetching pedidos por dia:', error);
            }
        };

        const fetchPopularidadProductos = async () => {
            try {
                const response = await getPopularidadProductos();
                setPopularidadProductos(response.data);
            } catch (error) {
                console.error('Error fetching popularidad productos:', error);
            }
        };

        const fetchPedidosPeriodo = async () => {
            try {
                const response = await getPedidosPeriodo(startDate, endDate);
                setPedidosPeriodo(response.data.total_pedidos);
            } catch (error) {
                console.error('Error fetching pedidos periodo:', error);
            }
        };

        fetchPedidosPorDia();
        fetchPopularidadProductos();
        fetchPedidosPeriodo();
    }, [startDate, endDate]);

    return (
        <div className='pedido-info-container'>
            <h2>Tendencia de Pedidos</h2>
            <div>
                <h3>Pedidos por Día</h3>
                <ul>
                    {pedidosPorDia.map((pedido, index) => (
                        <li key={index}>{pedido.day}: {pedido.count} pedidos</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Popularidad de Productos</h3>
                <ul>
                    {popularidadProductos.map((producto, index) => (
                        <li key={index}>{producto.producto__nombre}: {producto.total} vendidos</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Pedidos en un Período</h3>
                <p>Total de pedidos entre {startDate} y {endDate}: {pedidosPeriodo}</p>
            </div>
            <div>
                <label>Fecha de Inicio:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <label>Fecha de Fin:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
        </div>
    );
}
