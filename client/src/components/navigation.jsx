import {Link} from 'react-router-dom';



export function Navigation() {
    return(
    <header>
        <nav>
            <img src="./images/logo.jpg" alt='xd' className="home-foto"/>
            <hr />
            <Link to ="/login">Login</Link>
            <hr />
            <Link to="/register">Register</Link>
        </nav>
    </header>
    
)

}