import React, { useContext, useEffect } from "react";
import "./App.css";
import Home from "./components/home/Home";
import { ThemeContext } from "./context/ThemeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
// import Ticket from "./components/ticket/Ticket";
import TableTicket from "./components/ticket/TableTicket";

import useToken from "./hooks/useToken";
// import Sales from "./screens/sales/Sales";
import Login from "./screens/login/Login";
import Products from "./components/products/Products";
// import ButtonTheme from './components/buttonTheme/ButtonTheme';

function App() {
  const { theme } = useContext(ThemeContext);
  const { token, setToken } = useToken();
  console.log("🚀 ~ App ~ token:", token)

  useEffect(() => {
  }, [token])

  return (
    <div className={`app ${theme}`} data-theme={theme}>
      {token ? (
        <BrowserRouter>
          <NavBar />
          <Routes>
             {/* <Route path="/" element={<Home />} /> */}
          <Route path="/ticket" element={<TableTicket />} />
          {/* <Route path="/ticket/form" element={<Ticket />} /> */}
          {/* <Route path="/ventas" element={<Sales />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />

          <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
}

export default App;
