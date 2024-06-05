import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProductos, createVentas, createDetallesVentas } from '../api/registro.api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
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
        const productoExistente = carrito.find(item => item.producto.codigo_producto === producto.codigo_producto);
        if (productoExistente) {
            const carritoActualizado = carrito.map(item =>
                item.producto.codigo_producto === producto.codigo_producto
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            );
            setCarrito(carritoActualizado);
        } else {
            setCarrito([...carrito, { producto, cantidad: 1 }]);
        }
        setTotal(total + parseFloat(producto.precio));
        toast.success(`${producto.nombre} agregado al carrito`);
    };

    const handleCompra = async () => {
        try {
            const venta = {
                total_venta: total,
                cod_cliente: cliente.codigo_cliente
            };
            const ventaResponse = await createVentas(venta);
            const codigo_venta = ventaResponse.data.codigo_venta;
            
            const detallesVenta = carrito.map(item => ({
                venta: codigo_venta,
                producto: item.producto.codigo_producto,
                cantidad: item.cantidad
            }));
            console.log(ventaResponse.data)
            console.log(detallesVenta)
            for (var i = 0; i < detallesVenta.length; i++) {
                await createDetallesVentas(detallesVenta[i]);
            }
            
            toast.success('Compra realizada con éxito');
            
            navigate('/pedido', { state: { venta: ventaResponse.data, cliente } });
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
            <h1>Realiza tu pedido</h1>
            <p>Hola! {cliente.nombre} {cliente.apellido} </p>
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
                <ul>
                    {carrito.map((item, index) => (
                        <li key={index}>{item.producto.nombre} x {item.cantidad}</li>
                    ))}
                </ul>
            </div>
            <div className='center'>
                <button className='boton-carrito' onClick={handleCompra}>Comprar</button>
            </div>  
        </div>
    );
}
