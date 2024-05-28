import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductos } from '../api/registro.api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { createVentas } from '../api/registro.api';
import { useNavigate } from 'react-router-dom';
import './compra.css'; // Asegúrate de tener un archivo CSS para los estilos

export function Compra() {
    const location = useLocation();
    const { cliente } = location.state || {}; // Extraer el cliente del estado de navegación
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await getProductos();
                setProductos(response.data);
            } catch (error) {
                console.error('Error fetching productos:', error);
                toast.error('Error al obtener los productos');
            }
        };

        fetchProductos();
    }, []);

    const agregarAlCarrito = (producto) => {
        setCarrito([...carrito, producto]);
        setTotal(total + parseFloat(producto.precio));
        toast.success(`${producto.nombre} agregado al carrito`);
    };

    const handleCompra = async () => {
        try {
            const venta = {
                total_venta: total,
                cod_cliente: cliente.codigo_cliente, // Asegúrate de que cliente tiene un campo `codigo_cliente`
            };
            const response = await createVentas(venta);
            toast.success('Compra realizada con éxito');
            navigate('/pedido', { state: { venta: response.data } });
        } catch (error) {
            console.error('Error al realizar la compra:', error);
            toast.error('Error al realizar la compra');
        }
    };

    if (!cliente) {
        return <div>No se encontraron datos del cliente. Por favor, inicie sesión.</div>;
    }

    return (
        <div>
            <h1>Pedidos</h1>
            <p>Bienvenido, {cliente.nombre}</p>
            <div className="productos-grid">
                {productos.map((producto) => (
                    <div key={producto.codigo_producto} className="producto-card">
                        <h2>{producto.nombre}</h2>
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="producto-imagen"
                        />
                        <p>Precio: ${producto.precio}</p>
                        <button className='boton-carrito' onClick={() => agregarAlCarrito(producto)}>Agregar al Carrito</button>
                    </div>
                ))}
            </div>
            <div className="carrito-total">
                <h2>Total: ${total}</h2>
            </div>
            <div className='center'>
                <button className='boton-carrito' onClick={handleCompra}>Comprar</button>
            </div>  
            
        </div>
    );
}
