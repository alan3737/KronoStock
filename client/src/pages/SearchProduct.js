import { Link } from 'react-router-dom';
import '../styles/searchProduct.css'

const SearchProduct = ({ product, onClick }) => {
  return (
    <Link to={`/products/${product.id}`} className="productDetails" onClick = {onClick}>
      <div className="productCard">
        <img src={`/images/${product.product_image}`} alt={product.product_name} />
        <div className="productName">{product.product_name}</div>
      </div>
    </Link>
  );
};


export default SearchProduct;