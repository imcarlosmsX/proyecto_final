
export function Cards(nombre, descripcion, precio, imagen) {

    return (
        <div className="card">
            <img src='../../public/images/pan_de_bono.jpg' alt={nombre} />
            <h3> {nombre} </h3>
            <p> {precio} </p>
            <button>Agregar al carrito</button>
        </div>
    );  
}