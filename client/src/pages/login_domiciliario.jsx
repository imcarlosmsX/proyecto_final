import React, { useState, useEffect } from 'react';
import { getDomiciliarios } from '../api/registro.api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Hook para la navegación
import './LoginDomiciliario.css'; // Archivo de estilos CSS

export function LoginDomiciliario() {
    const [domiciliarios, setDomiciliarios] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook para la navegación

    useEffect(() => {
        const fetchDomiciliarios = async () => {
            try {
                const response = await getDomiciliarios();
                setDomiciliarios(response.data);
            } catch (error) {
                console.error("Error fetching domiciliarios:", error);
            }
        };

        fetchDomiciliarios();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const domiciliario = domiciliarios.find(d => d.nombre === usuario && d.codigo_domiciliario.toString() === password);

        if (domiciliario) {
            console.log(domiciliario)
            toast.success("Login exitoso");
            navigate('/pedido-domiciliario', { state: { domiciliario } }); // Redirige a la página de pedidos para domiciliarios
        } else {
            toast.error("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="login-domiciliario-container">
            <form onSubmit={handleSubmit} className="login-domiciliario-form">
                <h1 className="login-domiciliario-title">Login Domiciliario</h1>

                <label className="login-domiciliario-label">Nombre</label>
                <input 
                    type="text" 
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)} 
                    className="login-domiciliario-input"
                    required
                />
                <hr />
                <label className="login-domiciliario-label">Código Domiciliario</label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    className="login-domiciliario-input"
                    required
                />
                <hr />
                <button type="submit" className="login-domiciliario-button">Login</button>
            </form>
        </div>
    );
}
