import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPedidos } from '../api/registro.api'; // Ajusta la ruta según tu estructura de archivos

export function Pedido() {
    const location = useLocation();
    const { venta, cliente } = location.state || {};
    const [tipoEntrega, setTipoEntrega] = useState('');
    const navigate = useNavigate();

    if (!venta) {
        return <div>No se encontraron datos de la venta.</div>;
    }
    if (!cliente) {
        return <div>No se encontraron datos del cliente.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const pedido = {
                codigo_cliente: cliente.codigo_cliente, // Asume que `cliente` tiene un campo `id`
                codigo_venta: venta.codigo_venta, // Asume que `venta` tiene un campo `id`
                tipo_entrega: tipoEntrega,
            };
            const response = await createPedidos(pedido);
            const pedidoCreado = response.data;

            navigate('/info_pedido', { state: { pedido: pedidoCreado, cliente, venta } });
        } catch (error) {
            console.error("Error creando el pedido:", error);
        }
    };

    return (
        <div>
            <h1>Pedido</h1>
            <p>Estimado {cliente.nombre}, aquí están los datos de su pedido:</p>
            <p>Fecha de la venta: {venta.fecha_venta}</p>
            <p>Total a pagar: ${venta.total_venta}</p>
            <p>Dirección de entrega: {cliente.direccion}</p>
            <p>Teléfono de contacto: {cliente.telefono}</p>

            <form onSubmit={handleSubmit}>
                <label>
                    Tipo de entrega:
                    <select
                        value={tipoEntrega}
                        onChange={(e) => setTipoEntrega(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un tipo de entrega</option>
                        <option value="Recoger en la tienda">Recoger en la tienda</option>
                        <option value="Domicilio">Domicilio</option>
                    </select>
                </label>
                <br />
                <button type="submit">Ordenar</button>
            </form>
        </div>
    );
}