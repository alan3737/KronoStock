import './Product.css'

export default function Product({ product }) {

    return (
        <div className='product-card'>
            <a>
                <figure>
                    <img src={product.url}></img>
                    <figcaption>{product.name}</figcaption>
                    <h3>{ product.availability ? "In Stock" : "Out Of Stock" }</h3>
                </figure>

            </a>

        </div>
    )
}