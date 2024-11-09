const config = require('./config');
const http = require('http');
const sql = require('mssql');

const hostname = config.hostname;
const port = config.port;

const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    try {
        await sql.connect(config.sqlserver);
        const result = await sql.query`SELECT GETDATE() AS CurrentDateTime`;
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Node.js SQL Server</title>
                <style>
                    * {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }
                    body {
                        font-family: 'Helvetica Neue', Arial, sans-serif;
                        background-color: #fafafa;
                        color: #333;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        margin: 0;
                    }
                    .container {
                        background-color: #ffffff;
                        padding: 2rem;
                        border-radius: 0.5rem;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        max-width: 400px;
                        text-align: center;
                    }
                    h1 {
                        color: #333;
                        font-size: 1.5rem;
                        margin-bottom: 1rem;
                    }
                    p {
                        color: #666;
                        font-size: 0.95rem;
                    }
                    strong {
                        color: #007bff;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Hello World from Node.js!</h1>
                    <p><strong>Current Date and Time:</strong> ${result.recordset[0].CurrentDateTime}</p>
                </div>
            </body>
            </html>
        `;
        
        res.end(htmlContent);
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
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


