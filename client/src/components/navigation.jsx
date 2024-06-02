import { Link } from 'react-router-dom';
import './Navigation.css';

export function Navigation() {
    return (
        <header>
            <nav className="navbar">
                <img src="./images/logo.jpg" alt='logo' className="home-foto" />
                <div className="nav-links">
                    <Link to="/login" className="nav-button">Login</Link>
                    <Link to="/register" className="nav-button">Register</Link>
                    <Link to="/login-domiciliario" className="nav-button">Domiciliarios</Link>
                </div>
            </nav>
        </header>
    );
}
