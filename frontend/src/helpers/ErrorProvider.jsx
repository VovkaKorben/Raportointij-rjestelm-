import React, { useState, useCallback, useEffect } from 'react';
import { bridge, ErrorContext } from './api.js';

// const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [errors, setErrors] = useState([]);

    const addError = useCallback((msg) => {
        setErrors(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
    }, []);

    const clearErrors = () => setErrors([]);

    useEffect(() => {
        // Подключаем актуальный обработчик
        bridge.add = addError;

        // Если в очереди уже что-то накопилось (ошибки "до всего") — выводим
        if (bridge.queue.length > 0) {
            bridge.queue.forEach(msg => addError(msg));
            bridge.queue = [];
        }

        return () => { bridge.add = null; };
    }, [addError]);
    return (
        <ErrorContext.Provider value={{ errors, addError, clearErrors }}>
            {children}
        </ErrorContext.Provider>
    );
};

// export const useErrorLog = () => useContext(ErrorContext);