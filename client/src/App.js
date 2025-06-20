import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout"
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Layout/>}>
          <Route path = "product/:productId" element = {<ProductDetail/>}/>
          <Route path= "*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
