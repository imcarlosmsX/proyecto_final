import { useForm } from "react-hook-form";
import { createCliente, createDireccionCliente } from "../api/registro.api"; // Ajusta la ruta según tu estructura de archivos
import { toast } from "react-hot-toast";
import './Register.css'; // Archivo de estilos CSS

export function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = handleSubmit(async data => {
        try {
            const resCliente = await createCliente({
                nombre: data.nombre,
                apellido: data.apellido,
                telefono: data.telefono,
                user_name: data.user_name,
                password: data.password
            });
            const clienteId = resCliente.data.codigo_cliente;
            
            await createDireccionCliente({
                cliente: clienteId,
                direccion: data.direccion
            });

            toast.success("Cliente registrado");
            console.log(resCliente.data);
        } catch (error) {
            toast.error("Error registrando cliente");
            console.error(error);
        }
    });

    return (
        <div className="register-container">
            <form onSubmit={onSubmit} className="register-form">
                <h1 className="register-title">Register</h1>

                <label className="register-label">Nombre</label>
                <input 
                    type="text" 
                    {...register("nombre", { required: true })} 
                    className="register-input"
                />
                {errors.nombre && <p className="error-message">Nombre es requerido</p>}

                <label className="register-label">Apellido</label>
                <input 
                    type="text" 
                    {...register("apellido", { required: true })} 
                    className="register-input"
                />
                {errors.apellido && <p className="error-message">Apellido es requerido</p>}

                <label className="register-label">Direccion</label>
                <input 
                    type="text" 
                    {...register("direccion", { required: true })} 
                    className="register-input"
                />
                {errors.direccion && <p className="error-message">Direccion es requerida</p>}

                <label className="register-label">Telefono</label>
                <input 
                    type="text" 
                    {...register("telefono", { required: true })} 
                    className="register-input"
                />
                {errors.telefono && <p className="error-message">Telefono es requerido</p>}

                <label className="register-label">Username</label>
                <input 
                    type="text" 
                    {...register("user_name", { required: true })} 
                    className="register-input"
                />
                {errors.user_name && <p className="error-message">Username es requerido</p>}

                <label className="register-label">Password</label>
                <input 
                    type="password" 
                    {...register("password", { required: true })} 
                    className="register-input"
                />
                {errors.password && <p className="error-message">Password es requerido</p>}

                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
}
