import{useForm} from "react-hook-form";
import {createCliente} from "../api/registro.api"
import {toast} from "react-hot-toast";

export function Register() {

        const {register, handleSubmit, formState:{errors}} = useForm();
        const onSubmit = handleSubmit(async data => {
                const res = await createCliente(data)
                toast.success("Cliente registrado")
                console.log(res.data)
        })

return (
<form onSubmit={onSubmit}>
        <h1>Register</h1>

        <label>Nombre</label>
        <input type="nombre" 
        {...register("nombre", {required: true})}
        />
        <hr />
        <label>Apellido</label>
        <input type="apellido" 
        {...register("apellido", {required: true})}
        />
        <hr />
        <label>Direccion</label>
        <input type="direccion"
        {...register("direccion", {required: true})}
        />
<hr />

        <label>Telefono</label>
        <input type="telefono" 
        {...register("telefono", {required: true})}
        />
<hr />
        <label>Username</label>
        <input type="usuario" 
        {...register("user_name", {required: true})}
        />
<hr />
        <label>Password</label>
        <input type="password"
        {...register("password", {required: true})}
        />
<hr />
        <button>Register</button>
</form>
);
}