import React, { useContext } from 'react'
import './App.css';
import Home from './components/home/Home';
import { ThemeContext } from './context/ThemeContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Ticket from './components/ticket/Ticket';
import TableTicket from './components/ticket/TableTicket';
import Login from './screens/Login/Login';
import useToken from './hooks/useToken';
import Sales from './screens/sales/Sales';
// import ButtonTheme from './components/buttonTheme/ButtonTheme';

function App() {

  const { theme } = useContext(ThemeContext);
  const { token, setToken } = useToken();
  if(!token) {
    return <Login setToken={setToken}/>
  }
  return (
    <div className={`app ${theme}`} data-theme={theme}>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/ticket" element={<TableTicket />}/>
        <Route path="/ticket/form" element={<Ticket />}/>
        <Route path="/ventas" element={<Sales />}/>

        <Route path="*" element={<Home />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
