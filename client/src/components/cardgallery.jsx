import {Cards} from './cards.jsx';
import { getProductos } from "../api/registro.api";

export function CardGallery() {
    const productos = getProductos();
    let res;
    const fetchProductos = async () => {
        try {
            const response = await getProductos();
            res = response.data;
        } catch (error) {
            console.error("Error fetching productos:", error);
        }
    };
    return (
        <section className='galeria-cartas'>
            <h2>Productos</h2>
            <div className='cartas'>
                {console.log(res)}
                {/* {res.map((producto) => (
                    <Cards
                        key={producto.codigo_producto}
                        nombre={producto.nombre}
                        descripcion={producto.descripcion}
                        precio={producto.precio}
                        // imagen={producto.imagen}
                    />
                ))} */}
            </div>
        </section>
    )
}