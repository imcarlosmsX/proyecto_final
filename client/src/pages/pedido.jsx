import React from 'react';
import { useLocation } from 'react-router-dom';

export function Pedido() {
    const location = useLocation();
    const { venta, cliente } = location.state || {};

    if (!venta) {
        return <div>No se encontraron datos de la venta.</div>;
    }
    if (!cliente) {
        return <div>No se encontraron datos del cliente.</div>;
    }

    return (
        <div>
            <h1>Pedido</h1>
            <p>Estimado {cliente.nombre} aca los datos de su pedido </p>
            <p>Fecha de la venta: {venta.fecha_venta}</p>
            <p>Total a pagar: ${venta.total_venta}</p>
            <p>Direccion de entrega: {cliente.direccion} </p>
            <p>Telefono de contacto: {cliente.telefono} </p>
        </div>
    );
}