import { useState, useEffect, useRef } from "react";
import SearchProduct from "./SearchProduct";
import '../styles/searchBar.css'

const Searchbar = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [productsWithKeyword, setProductsWithKeyword] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const previousValue = useRef("");
    useEffect(() => {
        if(searchKeyword.trim() === ""){
            setProductsWithKeyword([]);
            return;
        }

        if(searchKeyword.trim() === previousValue.current){
            return;
        }

        const delay = setTimeout(async () => {
            try{
                const response = await fetch(`/products/search/${encodeURIComponent(searchKeyword)}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await response.json();
                setProductsWithKeyword(data);
                previousValue.current = searchKeyword;
                console.log(data);
            }
            catch(error){
                console.error("Search error:", error);
                setProductsWithKeyword([]);
            }
        }, 1000);

        return () => clearTimeout(delay)
    }, [searchKeyword]);
    
    return (
            <div className = "searchBar">
                <input type = "text" value = {searchKeyword} placeholder = "Search..." onChange={(e) => {setSearchKeyword(e.target.value); setShowDropdown(true)}} onClick = {() => setShowDropdown(true)} className = "input" />
                <span className = "magnifyingGlass">
                    <img src = "/images/magnifyingGlass.png" alt = "Search"/>
                </span>
                <div className = "productsWithKeyword">
                    {showDropdown && productsWithKeyword.map((product) => (
                        <SearchProduct key = {product.id} product = {product} onClick = {() => setShowDropdown(false)}/>
                    ))}
                </div>
            </div>
    )
}

export default Searchbar;