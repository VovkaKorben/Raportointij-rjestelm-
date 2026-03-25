import { useState } from 'react'
import schema from '../../../shared/schema.json'
import { prettify } from '../../../shared/debug.js'

import api, { useErrorLog } from '../helpers/api.jsx';
// import axios from 'axios'

function Dashboard() {

    // retrieve statistic for each department
    const getStat = async () => {
        const result = {}
        for (const dep in schema) {
            const res = await api.get(`statistic/${dep}`);
            result[dep] = res.data
        };
        return result
    }

    const stat = getStat()

    return (
        <div>Production statistic

            {<pre>{prettify(stat, 3)}</pre>}
        </div>
    )
}

export default Dashboard
