import ProductList from "./ProductList";
import TrackedStoreList from './TrackedStoreList';
import '../styles/Home.css'

export default function HomePage() {

    return (
        <div className = "homepage">
            <ProductList></ProductList>
            <TrackedStoreList></TrackedStoreList>
        </div>
    );
}