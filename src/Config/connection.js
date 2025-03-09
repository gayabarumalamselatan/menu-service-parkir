const connect = require('mysql2')

const connection = connect.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'express_test'
})

module.exports = connection.promise()

