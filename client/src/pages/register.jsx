export function Register() {
return (
    <form>
        <h1>Register</h1>

        <label>Nombre</label>
        <input type="nombre" />
        <hr />
        <label>Apellido</label>
        <input type="apellido" />
        <hr />

        <label>Direccion</label>
        <input type="direccion" />

<hr />

        <label>Telefono</label>
        <input type="telefono" />
<hr />
        <label>Username</label>
        <input type="usuario" />
<hr />
        <label>Password</label>
        <input type="contrasena" />
    
<hr />
        <button>Register</button>
    </form>
    );
}