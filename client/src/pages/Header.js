import Searchbar from "./Searchbar";

const Header = () => {
    return (
        <div className = "header">
            <div className = "logoAndName">
                <img src = "/images/stopwatch.webp" alt = "Stopwatch" />
                <p>
                    KronoStock
                </p>
            </div>
            <Searchbar />
        
        </div>
    )
}

export default Header;