import '../styles/Product.css'
import { Link } from 'react-router-dom';
export default function Product({ product }) {

    return (
        <div className='product-card'>
            <Link to={`/products/${product.id}`}>
                <figure>
                    <img src={`/images/${product.url}`}></img>
                    <figcaption>{product.product_name}</figcaption>
                    <h3>{ product.availability ? "In Stock" : "Out Of Stock" }</h3>
                </figure>
            </Link>
        </div>
    )
}