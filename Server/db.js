const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "smartbins",
    dateStrings: true,
})

connection.connect((error) => {
    if(error) {
        console.error('Error connecting to the database', error)
    }
    console.log('Connected to the database')
})

module.exports = connection