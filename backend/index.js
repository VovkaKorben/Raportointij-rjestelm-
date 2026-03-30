require('dotenv').config();
const cors = require('cors');
const express = require('express')
const mysql = require('mysql2/promise')
const schema = require('../shared/schema.json')

const { prettify } = require('../shared/debug.js')
const app = express();
app.use(cors());
app.use(express.json());

// create MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('🐮 MySQL connection successfull');
        connection.release(); // Возвращаем соединение в пул
    } catch (error) {
        console.error('⛔ MySQL connection error: ', error.message);
    }
})();



app.get('/api/boiling', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT b.*, e.name as employee_name, p.name as product_name 
            FROM boiling b
            JOIN employees e ON b.employee_id = e.id
            JOIN products p ON b.product_id = p.id
            ORDER BY b.datetime DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при чтении из БД' });
    }
});

app.get('/api/statistic/:department', async (req, res) => {
    const { department } = req.params
    console.log(department)
    const config = schema[department]
    if (!config) return res.status(404).json({ error: 'Department not found' })
    console.log(prettify(config, 1))


    try {
        const sqlStat = `SELECT SUM(${config.summary.column}) as total, COUNT(*) as entries_count FROM ${config.table}`
        const [[stat]] = await pool.query(sqlStat)
        const sqlLastEvent = `SELECT * FROM ${config.table} ORDER by datetime LIMIT 1`
        const [[lastEvent]] = await pool.query(sqlLastEvent)
        const data = {
            'statistic': stat,
            'lastEvent': lastEvent
        }

        res.status(200).json({ unit: config.unit, data: data })
    } catch (error) {
        res.status(500).json({ error: `query: ${sqlQuery}\nmsg: ${error.message}` })
    }
});

app.get('/api/lastevents', async (req, res) => {




    let result = {}
    try {

        for (department of schema) {
            console.log(department)
        }

        /*sqlQuery = `SELECT SUM(${config.summary.column}) as total, COUNT(*) as entries_count FROM ${config.table}`
        console.log(sqlQuery)
        const [rows] = await pool.query(sqlQuery)
        res.status(200).json({ unit: config.unit, data: rows })
        */
    } catch (error) {
        res.status(500).json({ error: `query: ${sqlQuery}\nmsg: ${error.message}` })
    }
});

app.post('/api/save/:type', (req, res) => {
    // Весь твой JSON от Axios уже здесь как объект
    const payload = req.body;

    console.log(payload.product_id); // Доступ к полям напрямую
    res.json({ status: 'received' });
});
app.get('/api/status', async (req, res) => {
    res.status(200).json({ message: 'status OK' });

});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
});