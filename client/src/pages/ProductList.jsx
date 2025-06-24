import Product from './Product.jsx';
import '../styles/ProductList.css';
import { useState, useEffect } from 'react';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('products/top/6');
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error', error);
        }
      };
      fetchData();
    }, []);
    return (
        <div>
            <h2>TOP PRODUCTS</h2>
            <div className="product-container">
                {products.map((product) => {
                    return <Product key={product.id} product={product}/>
                })} 
            </div>

        </div>
    );
}