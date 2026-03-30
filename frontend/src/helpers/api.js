
import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:3000/api/', timeout: 5000 });
// export const ErrorContext = createContext();
// export const useErrorLog = () => useContext(ErrorContext);

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