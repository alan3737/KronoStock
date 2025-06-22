import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Layout/>}>
          <Route path = "products/:productId" element = {<ProductDetail/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
