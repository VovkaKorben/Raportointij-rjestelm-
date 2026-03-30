import { useState, useEffect } from 'react'
import schema from '../../../shared/schema.json'
import { prettify } from '../../../shared/debug.js'

import api from '../helpers/api.js';
// import { useErrorLog } from '../helpers/ErrorProvider.jsx';
// import axios from 'axios'

function Dashboard() {

    const [stat, setStat] = useState({});
    useEffect(() => {
        const fetchStat = async () => {
            try {
                const result = {}
                for (const dep in schema) {
                    const res = await api.get(`statistic/${dep}`);
                    result[dep] = res.data;
                }
                setStat(result);
            } catch (err) {
                console.error(err.message)
                // Ошибка уже попала в addError через интерцептор,
                // здесь мы просто гасим её, чтобы не было Uncaught в консоли.
            }
        };
        fetchStat();
    }, []);



    return (
        <div>Production statistic

            {<pre>{prettify(stat, 3)}</pre>}
        </div>
    )
}

export default Dashboard
