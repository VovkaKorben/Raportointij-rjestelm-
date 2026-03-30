import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { bridge } from './api.js';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [errors, setErrors] = useState([]);

    const addError = useCallback((msg) => {
        setErrors(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
    }, []);

    const clearErrors = () => setErrors([]);

    useEffect(() => {
        bridge.notify = addError;
        return () => { bridge.notify = null; };
    }, [addError]);

    return (
        <ErrorContext.Provider value={{ errors, addError, clearErrors }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useErrorLog = () => useContext(ErrorContext);