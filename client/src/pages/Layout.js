import {Outlet} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer.jsx'

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer></Footer>
        </>
    )
}

export default Layout;