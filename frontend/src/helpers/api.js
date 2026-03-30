/*import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 5000
});

// Объект-мостик для связи с React-стейтом
export const bridge = { notify: null };

api.interceptors.response.use(
    res => res,
    err => {
        const msg = err.response?.data?.error || err.message;
        if (bridge.notify) bridge.notify(msg);
        return Promise.reject(err);
    }
);

export default api;
*/

import axios from 'axios';
import { createContext, useContext } from 'react';

export const api = axios.create({ baseURL: 'http://localhost:3000/api/', timeout: 5000 });
export const ErrorContext = createContext();
export const useErrorLog = () => useContext(ErrorContext);

// Сюда ловим мух (ошибки), пока React еще не проснулся
export const bridge = { add: null, queue: [] };

api.interceptors.response.use(
    res => res,
    err => {
        const stack = err.stack?.split('\n') || [];
        const line = stack.find(l => l.includes('at ') && !l.includes('node_modules'));
        const ctx = line ? (line.match(/at\s+(.*)\s+\(/)?.[1] || 'App') : 'API';
        const msg = `[${ctx}] ${err.response?.data?.error || err.message}`;
        
        if (bridge.add) bridge.add(msg); else bridge.queue.push(msg);
        return Promise.reject(err);
    }
);
export default api;