import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

const ThemeProvider = (props) => {
    const [theme, setTheme] = useState('light')
    console.log("🚀 Theme", theme)

    return (
        <ThemeContext.Provider value={{ theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ThemeProvider;
