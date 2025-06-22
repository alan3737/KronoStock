import logo from './logo.svg';
import './App.css';
import ProductList from './ProductList.jsx';
import Footer from './Footer.jsx';
import TrackedStoreList from './TrackedStoreList.jsx';
function App() {



  return (
    <div className="App">
      <header className="App-header">
        <img src="logo.svg" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      <ProductList></ProductList>
      <TrackedStoreList></TrackedStoreList>
      </header>
      
      <Footer></Footer>
    </div>
  );
}




export default App;
