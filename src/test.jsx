import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({children}) => {
    const [message, setMessage] = useState('');
    const showAlert = (message) => setMessage(message);
    const hideAlert = () => setMessage('')

    return (
        <AlertContext.Provider value={{message, showAlert, hideAlert}}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);