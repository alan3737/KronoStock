import Product from './Product.jsx';
import '../styles/ProductList.css';
import { useState, useEffect } from 'react';

export default function ProductList() {
    let [products, setProducts] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/products/top/6');
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.log(error('Error', error));
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