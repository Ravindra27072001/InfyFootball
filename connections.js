const { Client } = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 3000,
    password: "Rathore@123",
    database: "fifa"
})

module.exports = client