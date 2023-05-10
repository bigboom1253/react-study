import React, { createContext, useCallback, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if(context === undefined) {
        throw new Error("useTheme must be used within a ThemeContext")
    }

    return context
}

const ThemeProvider = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const handleToggleDarkMode = useCallback(() => {
        setIsDarkMode((prev) => !prev)
    }, [isDarkMode])

    return (
        <ThemeContext.Provider value={{isDarkMode, handleToggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;