import React, { useContext } from 'react'
import './App.css';
import Home from './components/home/Home';
import { ThemeContext } from './context/ThemeContext';
import ButtonTheme from './components/buttonTheme/ButtonTheme';


function App() {

  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`} data-theme={theme}>
    <ButtonTheme />
     <Home/>
    </div>
  );
}

export default App;
