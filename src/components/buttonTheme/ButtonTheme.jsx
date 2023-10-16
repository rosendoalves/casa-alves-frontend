import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import './buttonTheme.css'

const ButtonTheme = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
      <button className="toggle-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
      </button>
    )
  }
export default ButtonTheme