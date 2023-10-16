import React, { useContext } from 'react'
import './App.css';
import Home from './components/home/Home';
import { ThemeContext } from './context/ThemeContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Ticket from './components/ticket/Ticket';
import Ventas from './components/ventas/Ventas';
// import ButtonTheme from './components/buttonTheme/ButtonTheme';


function App() {

  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`} data-theme={theme}>
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/ticket" element={<Ticket />}/>
        <Route path="/ventas" element={<Ventas />}/>

        <Route path="*" element={<Home />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
