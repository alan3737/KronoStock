import '../styles/specificProductFromCompany.css'

const SpecificProductFromCompany = ({product}) => {
    return (
        <tr className = "companyProduct">
            <td className = 'companyLogo'>
                <img src = {`/images/${product.company_logo}`}/>
            </td>
            <td className = 'companyName'>
                {product.company_name}
            </td>
            <td>
                ${product.price}
            </td>
            <td>
                {product.time_updated}
            </td>
            <td className = 'availability'>
                <button onClick = {() => window.open(`https://${product.url}`, '_blank')} className = {product.availability ? "inStock" : "outOfStock"}>
                    {product.availability ? "IN STOCK" : "OUT OF STOCK"}
                </button>
            </td>
        </tr>
    )
}

export default SpecificProductFromCompany;