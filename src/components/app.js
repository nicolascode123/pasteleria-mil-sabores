// src/App.js
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { inicializarDatos } from "./data/store";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";

// 🔹 Importa tus estilos
import "./styles/styleadmin.css";
import "./styles/styleauth.css";
import "./styles/styleindex.css";
import "./styles/styleperfil.css";

function App() {
  useEffect(() => {
    inicializarDatos();
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
