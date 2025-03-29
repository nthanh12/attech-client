import logo from "./logo.svg";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Public from "./routes/Public";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children;
};

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Public />
      </ScrollToTop>
    </Router>
  );
}

export default App;
