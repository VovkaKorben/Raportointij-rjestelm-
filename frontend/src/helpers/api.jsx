import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Создаем сам инстанс Axios
const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 5000
});

// 2. Контекст для хранения массива ошибок
const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [errors, setErrors] = useState([]);

    // const addError = (msg) => setErrors((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
    const addError = React.useCallback((msg) => {
        setErrors((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
    }, []);
    const clearErrors = () => setErrors([]);

    // 3. Инициализируем перехватчик прямо внутри провайдера
    useEffect(() => {
        const interceptor = api.interceptors.response.use(
            (res) => res,
            (err) => {
                let msg = "";

                if (err.response) {
                    // Сервер ответил, но прислал ошибку (400, 500...)
                    msg = err.response.data?.error || `Ошибка сервера: ${err.response.status}`;
                } else if (err.request) {
                    if (err.code === 'ECONNABORTED') {
                        msg = "Время ожидания истекло: сервер отвечает слишком долго";
                    } else {
                        msg = "Связь потеряна: проверь, запущен ли бэкенд и нет ли проблем с CORS";
                    }
                } else {
                    // Что-то совсем криво в самом коде
                    msg = err.message;
                }

                addError(msg);
                return Promise.reject(err);
            }
        );

        // Чистим перехватчик при размонтировании (на всякий случай)
        return () => api.interceptors.response.eject(interceptor);
    }, []);

    return (
        <ErrorContext.Provider value={{ errors, clearErrors, addError }}>
            {children}
        </ErrorContext.Provider>
    );
};

// Хук, чтобы доставать ошибки в компонентах
export const useErrorLog = () => useContext(ErrorContext);

export default api;