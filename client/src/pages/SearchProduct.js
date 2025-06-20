import { Link } from 'react-router-dom';

const SearchProduct = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="productDetails">
      <div className="productCard">
        <img src={`/images/${product.product_image}`} alt={product.product_name} />
        <div className="productName">{product.product_name}</div>
      </div>
    </Link>
  );
};


export default SearchProduct;