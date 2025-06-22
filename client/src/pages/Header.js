import Searchbar from "./Searchbar";
import '../styles/header.css'
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div className = "header">
            <Link to = "/" className = "goHome">
                <div className = "logoAndName">
                    <img src = "/images/stopwatch.webp" alt = "Stopwatch" />
                    <p>
                        KronoStock.com
                    </p>
                </div>
            </Link>
            <Searchbar />
        </div>
    )
}

export default Header;