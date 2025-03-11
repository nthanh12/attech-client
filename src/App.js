import logo from "./logo.svg";
import Header from "./components/Shared/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Footer from "./components/Shared/Footer";
import ProductList from "./components/Product/ProductList";
import Service from "./pages/Service";
import News from "./pages/News";
import Contact from "./pages/Contact";
import GetAll from "./components/News/Recruitment/GetAll";
import Detail from "./components/News/Recruitment/Detail";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/service" element={<Service />} />

          <Route path="/news" element={<News />} />

          <Route path="/news/recruitment/all" element={<GetAll />} />
          <Route path="/news/recruitment/detail/:id" element={<Detail />} />

          <Route path="/contact" element={<Contact />} />

          <Route
            path="/product-category/product-list"
            element={<ProductList />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
