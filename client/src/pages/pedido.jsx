import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPedidos, createDireccionCliente, getDirecciones } from '../api/registro.api'; // Ajusta la ruta según tu estructura de archivos
import './compra.css'; // Asegúrate de tener un archivo CSS para los estilos
import './Pedido.css'; // Asegúrate de tener un archivo CSS para los estilos

export function Pedido() {
    const location = useLocation();
    const { venta, cliente } = location.state || {};
    const [tipoEntrega, setTipoEntrega] = useState('');
    const [direccion, setDireccion] = useState('');
    const [direcciones, setDirecciones] = useState([]);
    const [nuevaDireccion, setNuevaDireccion] = useState('');
    const [agregarNuevaDireccion, setAgregarNuevaDireccion] = useState(false);
    const [comentario, setComentario] = useState(''); // Estado para el comentario
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDirecciones = async () => {
            try {
                const res = await getDirecciones();
                const direccionesCliente = res.data.filter(dir => dir.cliente === cliente.codigo_cliente);
                setDirecciones(direccionesCliente);
            } catch (error) {
                console.error("Error fetching direcciones:", error);
            }
        };

        fetchDirecciones();
    }, [cliente]);

    if (!venta) {
        return <div>No se encontraron datos de la venta.</div>;
    }
    if (!cliente) {
        return <div>No se encontraron datos del cliente.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let direccionFinal = direccion;
            if (agregarNuevaDireccion && nuevaDireccion) {
                const resNuevaDireccion = await createDireccionCliente({
                    cliente: cliente.codigo_cliente,
                    direccion: nuevaDireccion
                });
                direccionFinal = resNuevaDireccion.data.codigo_direccion;
            }
            const pedido = {
                codigo_cliente: cliente.codigo_cliente,
                codigo_venta: venta.codigo_venta,
                tipo_entrega: tipoEntrega,
                direccion_entrega: direccionFinal,
                comentario: comentario // Agregar comentario al pedido
            };
            const response = await createPedidos(pedido);
            const pedidoCreado = response.data;

            navigate('/info_pedido', { state: { pedido: pedidoCreado, cliente, venta } });
        } catch (error) {
            console.error("Error creando el pedido:", error);
        }
    };

    return (
        <div className="pedido-container">
            <h1 className="pedido-title">Pedido</h1>
            <p>Estimado {cliente.nombre}, aquí están los datos de su pedido:</p>
            <p>Fecha de la venta: {venta.fecha_venta}</p>
            <p>Total a pagar: ${venta.total_venta}</p>
            <p>Teléfono de contacto: {cliente.telefono}</p>

            <form onSubmit={handleSubmit} className="pedido-form">
                <label className="pedido-label">
                    Dirección de entrega:
                    <select
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                        className="pedido-select"
                        disabled={agregarNuevaDireccion}
                    >
                        <option value="">Seleccione una dirección</option>
                        {direcciones.map(dir => (
                            <option key={dir.codigo_direccion} value={dir.codigo_direccion}>
                                {dir.direccion}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label>
                        <input
                            type="checkbox"
                            checked={agregarNuevaDireccion}
                            onChange={(e) => setAgregarNuevaDireccion(e.target.checked)}
                        />
                        Agregar nueva dirección
                    </label>
                </label>
                {agregarNuevaDireccion && (
                    <label className="pedido-label">
                        Nueva Dirección:
                        <input
                            type="text"
                            value={nuevaDireccion}
                            onChange={(e) => setNuevaDireccion(e.target.value)}
                            required
                            className="pedido-input"
                        />
                    </label>
                )}
                <br />
                <label className="pedido-label">
                    Tipo de entrega:
                    <select
                        value={tipoEntrega}
                        onChange={(e) => setTipoEntrega(e.target.value)}
                        required
                        className="pedido-select"
                    >
                        <option value="">Seleccione un tipo de entrega</option>
                        <option value="Recoger en la tienda">Recoger en la tienda</option>
                        <option value="Domicilio">Domicilio</option>
                    </select>
                </label>
                <br />
                <label className="pedido-label">
                    <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        className="pedido-textarea"
                        rows="4"
                        cols="50"
                        placeholder="Escriba aquí sus comentarios extras..."
                    />
                </label>
                <br />
                <button type="submit" className='boton-carrito'>Ordenar</button>
            </form>
        </div>
    );
}
