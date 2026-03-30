
import axios from 'axios';
import { createContext, useContext } from 'react'; // Нужно добавить

export const api = axios.create({ baseURL: 'http://localhost:3000/api/', timeout: 5000 });

export const ErrorContext = createContext();
export const useErrorLog = () => useContext(ErrorContext);

// Сюда ловим мух (ошибки), пока React еще не проснулся
export const bridge = { add: null, queue: [] };

api.interceptors.response.use(
    res => res,
    err => {
        const msg = err.response?.data?.error || err.message;
        if (bridge.add) bridge.add(msg); else bridge.queue.push(msg);
        return Promise.reject(err);
    }
);
export default api;