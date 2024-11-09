const config = {
    sqlserver: {
        user: 'sa',
        password: 'YourPassword123',
        server: 'db_sqlserver',
        database: 'master',
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    },
    hostname: '0.0.0.0',
    port: 3000
};

module.exports = config;