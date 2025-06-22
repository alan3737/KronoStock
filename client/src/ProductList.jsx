import Product from './Product.jsx';
import './ProductList.css';
import { useState, useEffect } from 'react';

export default function ProductList() {
  let products = [
  {
    id: "1",
    url: "http://localhost:3000/logo512.png",
    name: "react",
    availability: true

  }, {
    id: "2",
    url: "http://localhost:3000/logo512.png",
    name: "react",
    availability: true
  },
  {
    id: "3",
    url: "http://localhost:3000/logo512.png",
    name: "react",
    availability: true

  }, {
    id: "4",
    url: "http://localhost:3000/logo512.png",
    name: "react",
    availability: true
  },

  {
    id: "5",
    url: "http://localhost:3000/logo512.png",
    name: "react",
    availability: true

  }, {
    id: "1",
    url: "http://localhost:3000/logo512.png",
    name: "react",
    availability: true
  },

];
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/top/6');
          products = await response.json();
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