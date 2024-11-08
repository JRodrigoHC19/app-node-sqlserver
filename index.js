const config = require('./config');
const http = require('http');
const sql = require('mssql');

const hostname = config.hostname;
const port = config.port;

const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    try {
        await sql.connect(config.sqlserver);
        const result = await sql.query`SELECT GETDATE() AS CurrentDateTime`;
        res.end(JSON.stringify({
            status: 'success',
            message: 'Hello World from Node.js!',
            date_time: `${result.recordset[0].CurrentDateTime}`
        }));
    } catch (err) {
        res.statusCode = 500;
        console.error('Error connecting to SQL Server:', err);
        res.end(JSON.stringify({
            status: 'error',
            message: 'Error connecting to SQL Server.',
        }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
