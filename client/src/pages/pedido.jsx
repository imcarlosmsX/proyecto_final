import { useLocation } from 'react-router-dom';
import { createPedidos } from '../api/registro.api';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';


export function Pedido() {
    const location = useLocation();
    const { cliente } = location.state || {}; // Extraer el cliente del estado de navegación
    const {register, handleSubmit, formState:{errors}} = useForm();
    const onSubmit = handleSubmit(async data => {
            const res = await createPedidos(data)
            toast.success("Pedido realizado")
            console.log(res.data)
    })

    if (!cliente) {
        return <div>No se encontraron datos del cliente. Por favor, inicie sesión.</div>;
    }

    return (
        <div>
            <h1>Pedidos</h1>
            <p>Bienvenido, {cliente.nombre}</p>
        </div>
    );
}
