import '../styles/Footer.css';
import {Link} from 'react-router-dom'
export default function Footer() {
    return(
        <section className='mainfooter'>
            <ul className="row-links">
                <li><Link to ="">Home</Link></li>
                <li><Link to ="">Terms & Conditions</Link></li>
            </ul>
            <div className="copyright">© KronoStock.io 2025. All Rights Reserved.</div>
        </section>
    );
}