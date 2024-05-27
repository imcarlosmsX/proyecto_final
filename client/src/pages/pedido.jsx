import { useLocation } from 'react-router-dom';

export function Pedido() {
    const location = useLocation();
    const { cliente } = location.state || {}; // Extraer el cliente del estado de navegación

    if (!cliente) {
        return <div>No se encontraron datos del cliente. Por favor, inicie sesión.</div>;
    }

    return (
        <div>
            <h1>Pedidos</h1>
            <p>Bienvenido, {cliente.nombre}</p>
            {/* Aquí puedes renderizar la información del cliente y permitirles hacer un pedido */}
        </div>
    );
}
