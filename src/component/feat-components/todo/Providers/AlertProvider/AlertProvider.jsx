import React, { createContext, useCallback, useContext, useState } from 'react';
import AlertPortal from '../../../../AlertPortal/AlertPortal';
import AlertModal from '../../../../AlertModal/AlertModal';

const AlertContext = createContext(null)

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (context === undefined){
        throw new Error("userAlert must be used within a AlertContext");
    }
    return context
}


const AlertProvider = ({children}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [alertOptions, setAlertOptions] = useState({
        title : "모달창",
        contents : ""
    })

    const handleOpen = useCallback((alertOptions) => {
        setIsOpen(true);
        setAlertOptions({...alertOptions});
    }, [])

    const handleClose = useCallback(() => {
        setIsOpen(false)
        setAlertOptions({
            title : "모달창",
            contents : ""
        })
    }, [])
    return (
        <AlertContext.Provider value={{isOpen, alertOptions, handleOpen, handleClose}}>
            {children}
            <AlertPortal>
                <AlertContext.Consumer>
                    {(value) => {
                        return <AlertModal {...value}/>
                    }}
                </AlertContext.Consumer>
            </AlertPortal>
        </AlertContext.Provider>
    );
};

export default AlertProvider;