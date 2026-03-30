import { useState, useEffect } from 'react'
import schema from '../../../shared/schema.json'
import { prettify } from '../../../shared/debug.js'

import api from '../helpers/api.js';

function Dashboard() {

    const [stat, setStat] = useState({});
    useEffect(() => {
        const fetchStat = async () => {
            let result = {}
            try {
                // fetch stat by department                
                for (const dep in schema) {
                    const res = await api.get(`statistic/${dep}`);
                    result[dep] = res.data;
                }

                setStat(result);
            } catch (err) { console.error(err.message) }
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
