import React, { useContext } from "react";
import "./App.css";
import Home from "./components/home/Home";
import { ThemeContext } from "./context/ThemeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
// import Ticket from "./components/ticket/Ticket";
// import TableTicket from "./components/ticket/TableTicket";

import useToken from "./hooks/useToken";
// import Sales from "./screens/sales/Sales";
import Login from "./screens/login/Login";
import Products from "./components/products/Products";
// import ButtonTheme from './components/buttonTheme/ButtonTheme';

function App() {
  const { theme } = useContext(ThemeContext);
  const { token, setToken } = useToken();
  if (!token) {
    return (
      <div className={`app ${theme}`} data-theme={theme}>
        <Login setToken={setToken} />
      </div>
    );
  }
  return (
    <div className={`app ${theme}`} data-theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/ticket" element={<TableTicket />} />
          <Route path="/ticket/form" element={<Ticket />} />
          <Route path="/ventas" element={<Sales />} /> */}
          <Route path="/productos" element={<Products />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
