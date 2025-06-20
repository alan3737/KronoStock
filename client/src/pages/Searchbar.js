import { useState } from "react";
import SearchProduct from "./SearchProduct";

const Searchbar = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [productsWithKeyword, setProductsWithKeyword] = useState([]);
    useEffect(() => {
        if(searchKeyword.trim() == ""){
            setProductsWithKeyword([]);
            return;
        }

        const delay = setTimeout(async () => {
            try{
                const response = await fetch(`/search/${encodeURIComponent(searchKeyword)}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await response.json();
                setProductsWithKeyword(data);
            }
            catch(error){
                console.error("Search error:", error);
                setProductsWithKeyword([]);
            }
        }, 1000);

        return () => clearTimeout(delay)
    }, [searchKeyword]);
    
    return (
        <>
            <div className = "searchBar">
                <input type = "text" value = {searchKeyword} placeholder = "Search..." onChange={(e) => setSearchKeyword(e.target.value)}/>
                <span className = "magnifyingGlass">
                    <img src = "/images/magnifyingGlass.png" alt = "Search"/>
                </span>
            </div>
            <div className = "productsWithKeyword">
                {productsWithKeyword.map((product) => (
                    <SearchProduct key = {product.id} product = {product}/>
                ))}
            </div>
        </>
    )
}

export default Searchbar;