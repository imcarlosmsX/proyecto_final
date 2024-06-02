import React, { useState, useEffect } from 'react';
import { getClientes } from '../api/registro.api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Hook para la navegación
import './Login.css'; // Archivo de estilos CSS

export function Login() {
    const [clientes, setClientes] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await getClientes();
                setClientes(response.data);
            } catch (error) {
                console.error("Error fetching clientes:", error);
            }
        };

        fetchClientes();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const cliente = clientes.find(c => c.user_name === usuario && c.password === password);

        if (cliente) {
            toast.success("Login exitoso");
            console.log(cliente);
            navigate('/compra', { state: { cliente } });
        } else {
            toast.error("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1 className="login-title">Login</h1>
                <label className="login-label">Username</label>
                <input
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                    className="login-input"
                />
                <hr />
                <label className="login-label">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                />
                <hr />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}
