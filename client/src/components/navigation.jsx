import {Link} from 'react-router-dom';



export function Navigation() {
    return(
    <header>
        <nav>
            <Link to ="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
    </header>
    
)

}