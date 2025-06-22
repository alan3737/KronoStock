import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import SpecificProductFromCompany from './SpecificProductFromCompany';
import '../styles/productDetail.css'

const ProductDetail = () => {
    const {productId} = useParams();
    const [productArray, setProductArray] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`/products/${productId}`);
                const data = await response.json();
                setProductArray(data);
                console.log(data);
            }
            catch(err){
                console.error(err);
                setProductArray([]);
            }
        }
        fetchData();
    }, [productId]);

    if(productArray.length === 0){
        return (<> </>)
    }

    return (
        <div className = 'productPage'>
            <div className = 'specificProduct'>
                <div className = 'productNameImageDescription'>
                    <img src = {`/images/${productArray[0].product_image}`} alt = {productArray[0].product_name} />
                    <h1> {productArray[0].product_name}</h1>
                    <p> {productArray[0].description}</p>
                </div>
                <table className = 'stockTable'>
                    <tr className = 'tableHeaders'>
                        <th colSpan = '2' className = 'stores'> Store </th>
                        <th> Current Price </th>
                        <th> Last Stock </th>
                        <th> Availability</th>
                    </tr>
                    {productArray.map((product, index) => (
                        <SpecificProductFromCompany key = {index} product = {product}/>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default ProductDetail;