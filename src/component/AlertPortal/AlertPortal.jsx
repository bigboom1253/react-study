import React from 'react';
import ReactDOM from "react-dom";

const AlertPortal = ({children}) => {
    const root = document.getElementById("alert-root");
    return ReactDOM.createPortal(children, root);
};

export default AlertPortal;