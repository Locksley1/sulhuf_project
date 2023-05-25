const express = require("express")

const server = express()

const connect = require('./config/db')
connect()

server.use(express.json({
  extended: false
}))

server.use('/api/employees', require('./api/employees'))

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})
